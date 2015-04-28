json.array!(@blogs) do |blog|
  json.extract! blog, :id, :firstname, :lastname, :title, :content
  json.url blog_url(blog, format: :json)
end
