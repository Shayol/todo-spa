require 'rails_helper'

RSpec.describe Task, type: :model do

  it { should belong_to(:project)}
  it { should have_many(:comments).dependent(:destroy) }
  it { should validate_presence_of :project }
  it { should validate_presence_of :title }
end
