require 'rails_helper'

RSpec.describe Comment, type: :model do

  it { should belong_to :task }
  it { should have_many(:attachments).dependent(:destroy) }
  it { should validate_presence_of :text }
end
