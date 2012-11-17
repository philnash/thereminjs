require 'rubygems'
require 'bundler'
Bundler.setup
Bundler.require(:default)

use Rack::Chunked
use Rack::Static,
  :urls => ["/css", "/js"],
  :root => "public"

run lambda { |env|
  basic_response = [
      200,
      {
        'Content-Type'  => 'text/html',
        'Cache-Control' => 'public, max-age=86400'
      }
    ]
  path = env['PATH_INFO']
  case path
  when ''
  when '/'
    basic_response << File.open('public/index.html', File::RDONLY)
    basic_response
  when '/objectdetect'
    basic_response << File.open('public/objectdetect.html', File::RDONLY)
    puts basic_response
    basic_response
  when '/handtrack'
    basic_response << File.open('public/handtrack.html', File::RDONLY)
    puts basic_response
    basic_response
  else
    [404]
  end
}