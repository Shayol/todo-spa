FactoryGirl.define do
  factory :project do
    title { Faker::Lorem.sentence }
    user
  end

end

end
