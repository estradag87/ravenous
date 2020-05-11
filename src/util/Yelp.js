import SearchBar from "../components/SearchBar/SearchBar";

const apiKey =
  "7QBAHfK_ZTleVubu5mKozGgHHj9P4VgqC1mNvzPXjQx0CcfxynEVvotKCXsmtp5wkRlRiwVKlisD1IJlQX5jHwq_d-pRjndcL1TkNSZC1Bc5MfGxs1_iYJXbgqu5XnYx";

const Yelp = {
  search(term, location, sortBy) {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map((business) => ({
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.category && business.category.title,
            rating: business.rating,
            reviewCount: business.review_count,
          }));
        }
      });
  },
};

export default Yelp;
