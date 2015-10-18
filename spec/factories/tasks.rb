FactoryGirl.define do
  factory :task do
    project
    title { Faker::Lorem.sentence }
  end

end
