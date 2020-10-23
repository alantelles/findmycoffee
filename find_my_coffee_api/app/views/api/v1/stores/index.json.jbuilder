json.data @stores do |store|
    json.id store.id
    json.lonlat store.lonlat
    json.name store.name
    json.address store.address
    json.google_place_id store.google_place_id
    json.ratings_count store.ratings.count
    json.ratings_avg store.ratings_avg
end
json.status 200