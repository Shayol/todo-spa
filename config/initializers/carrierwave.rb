CarrierWave.configure do |config|
  config.dropbox_app_key = ENV["dropbox_app_key"]
  config.dropbox_app_secret = ENV["dropbox_app_secret"]
  config.dropbox_access_token = ENV["dropbox_access_token"]
  config.dropbox_access_token_secret = ENV["dropbox_access_token_secret"]
  config.dropbox_user_id = ENV["dropbox_user_id"]
  config.dropbox_access_type = "dropbox"
end