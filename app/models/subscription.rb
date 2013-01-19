class Subscription < ActiveRecord::Base
  attr_accessible :plan_id, :status, :user_id

  belongs_to :user
  belongs_to :plan

  before_create {|s| s.status = "pending"}

  before_destroy :deactivate_stripe_subscription

  def create_or_update_subscription
    user.billing_setting.customer.update_subscription(:plan => plan.stripe_id)
    self.save
  end

  def migrate(new_plan)
    if new_plan.amount > self.plan.amount
      # Upgrade
      user.billing_setting.customer.update_subscription(:plan => new_plan.stripe_id,
        :prorate => true)
      self.plan_id = new_plan.id
      self.status = "pending"
      self.save!
    else
      # Downgrade
      user.billing_setting.customer.update_subscription(:plan => new_plan.stripe_id,
        :prorate => false)
      schedule_at = Time.at(user.billing_setting.customer.subscription.current_period_end).utc
      user.build_plan_migration(:new_plan_id => new_plan.id,
        :schedule_at => schedule_at)
      user.plan_migration.save
    end
  end

  def deactivate_stripe_subscription
    begin
      user.billing_setting.customer.cancel_subscription
    rescue
      return true
    end
  end

end
