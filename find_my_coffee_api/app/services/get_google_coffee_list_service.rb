require 'rest-client'
require 'json'

class GetGoogleCoffeeListService
  def initialize(lat, lon)
    @lat = lat
    @lon = lon
  end

  def call
    begin
      gsk = Rails::application.credentials.google_secret_key
      location = "#{@lat},#{@lon}"
      radius = "10000"
      base_url = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=coffee+shops&location=#{location}&radius=#{radius}&key=#{gsk}"
      response = RestClient.get base_url
      JSON.parse(response.body)
    rescue RestClient::ExceptionWithResponse => 
      e.response
    end
  end
end