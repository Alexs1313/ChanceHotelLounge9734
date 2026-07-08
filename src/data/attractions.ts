import { Attraction } from '../types';

export const formatCoords = (lat: number, lon: number): string =>
  `${lat.toFixed(4)}° ${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lon).toFixed(4)}° ${
    lon >= 0 ? 'E' : 'W'
  }`;

export const attractions: Attraction[] = [
  {
    id: 'knox-mountain-park',
    name: 'Knox Mountain Park',
    lat: 50.6924,
    lon: -119.5039,
    short: 'Scenic hiking trails overlooking beautiful Okanagan Lake.',
    description: [
      "Knox Mountain Park is one of Kelowna's most popular outdoor destinations, offering spectacular panoramic views of Okanagan Lake and the surrounding valley. Visitors can choose from several hiking and cycling trails suitable for different fitness levels while enjoying peaceful natural surroundings. Scenic viewpoints throughout the park provide excellent opportunities for photography and wildlife observation. During warmer months, the park is a favorite location for sunrise and sunset walks.",
      'The park is easily accessible from downtown Kelowna and offers picnic areas, rest stops, and numerous viewpoints along the trails. Whether you are looking for a relaxing walk or a more challenging hike, Knox Mountain delivers unforgettable scenery throughout every season. Comfortable footwear and water are recommended for longer routes. The summit rewards visitors with one of the best panoramic views in the region.',
    ],
    image: 'KnoxMountainPark',
  },
  {
    id: 'waterfront-park',
    name: 'Waterfront Park',
    lat: 49.8918,
    lon: -119.4953,
    short: 'Beautiful lakeside park with walking paths.',
    description: [
      'Waterfront Park is a vibrant destination located along the shores of Okanagan Lake. Wide walking paths, sandy beaches, and beautifully landscaped gardens make it a favorite place for both visitors and locals. Public art installations, fountains, and marina views create a relaxing atmosphere throughout the day. The park regularly hosts outdoor performances and seasonal events.',
      "Guests can enjoy lakeside cafés, rent bicycles, or simply relax while watching boats cross the lake. Families appreciate the open green spaces and children's playgrounds, while photographers enjoy the scenic waterfront throughout the day. The park connects easily with downtown shopping and restaurants. It is an excellent place for a leisurely afternoon.",
    ],
    image: 'WaterfrontPark',
  },
  {
    id: 'myra-canyon-trestles',
    name: 'Myra Canyon Trestles',
    lat: 49.8032,
    lon: -119.3166,
    short: 'Historic railway bridges above dramatic canyon scenery.',
    description: [
      "Myra Canyon is famous for its impressive wooden trestle bridges and spectacular canyon views along the historic Kettle Valley Railway. Visitors can walk or cycle across restored railway bridges while exploring one of British Columbia's most iconic outdoor attractions. The route offers breathtaking scenery, tunnels, and panoramic mountain landscapes. Every section tells part of the area's fascinating railway history.",
      'The trail is suitable for families, casual walkers, and cycling enthusiasts alike. Information panels throughout the route explain the engineering achievements and history behind each bridge. The peaceful surroundings make this destination perfect for outdoor photography and nature exploration. Early morning visits often provide the best lighting and cooler temperatures.',
    ],
    image: 'MyraCanyonTrestles',
  },
  {
    id: 'okanagan-lavender-farm',
    name: 'Okanagan Lavender Farm',
    lat: 49.9367,
    lon: -119.4472,
    short: 'Fragrant lavender fields with stunning countryside views.',
    description: [
      'Escape into colorful lavender fields filled with beautiful aromas and scenic countryside landscapes. During the blooming season, thousands of lavender plants create vibrant purple fields that attract photographers and nature lovers from across the region. Visitors can stroll through the gardens, enjoy fresh lavender products, and relax in peaceful surroundings. The farm shop offers locally produced gifts and handmade products.',
      'Guided tours introduce guests to lavender cultivation and harvesting techniques used throughout the growing season. Seasonal cafés serve refreshing beverages and locally made desserts inspired by lavender flavors. The peaceful atmosphere makes this destination ideal for couples and families alike. Blooming conditions vary depending on the season.',
    ],
    image: 'OkanaganLavenderFarm',
  },
  {
    id: 'mission-creek-greenway',
    name: 'Mission Creek Greenway',
    lat: 49.8654,
    lon: -119.4326,
    short: 'Peaceful riverside trail surrounded by lush nature.',
    description: [
      "Mission Creek Greenway offers kilometers of scenic walking and cycling paths following one of Kelowna's most beautiful waterways. Shaded trails, wooden bridges, and abundant wildlife create a relaxing outdoor experience suitable for every age. Visitors frequently spot birds, turtles, and seasonal salmon during different times of the year. Interpretive signs explain the area's diverse ecosystem.",
      'The Greenway provides several access points, picnic areas, and rest stops along the route. Whether you choose a short walk or a longer bike ride, the peaceful environment offers an excellent escape from the city. The trail is well maintained throughout the year and is popular with both locals and visitors. Comfortable walking shoes are recommended.',
    ],
    image: 'MissionCreekGreenway',
  },
  {
    id: 'summerhill-pyramid-winery',
    name: 'Summerhill Pyramid Winery',
    lat: 49.8209,
    lon: -119.4678,
    short: 'Award-winning winery with panoramic vineyard landscapes.',
    description: [
      "Summerhill Pyramid Winery is internationally recognized for its organic wines and distinctive pyramid wine cellar. Visitors can enjoy guided tastings while overlooking rolling vineyards and breathtaking lake views. The winery's architecture and gardens create a peaceful setting for relaxing afternoons. Seasonal menus feature fresh local ingredients paired with award-winning wines.",
      'Knowledgeable staff share insights into sustainable winemaking practices and the history of the vineyard. Guests are welcome to explore the grounds, browse the boutique wine shop, or enjoy lunch on the outdoor terrace. The location combines exceptional hospitality with unforgettable scenery. Advance reservations are recommended during peak season.',
    ],
    image: 'SummerhillPyramidWinery',
  },
  {
    id: 'kasugai-gardens',
    name: 'Kasugai Gardens',
    lat: 49.8886,
    lon: -119.4968,
    short: 'Traditional Japanese garden with tranquil walking paths.',
    description: [
      'Kasugai Gardens is a peaceful Japanese garden located in the heart of downtown Kelowna. Beautiful ponds, waterfalls, stone pathways, and carefully maintained landscaping create a calm environment inspired by traditional Japanese design. Visitors can enjoy quiet walks while appreciating seasonal flowers and ornamental trees. Every corner offers opportunities for peaceful reflection.',
      'The gardens symbolize the friendship between Kelowna and its sister city in Japan. Benches placed throughout the landscape encourage guests to pause and enjoy the tranquil surroundings. The gardens are especially beautiful during spring blossoms and autumn colors. Entry is free and open throughout the warmer seasons.',
    ],
    image: 'KasugaiGardens',
  },
  {
    id: 'okanagan-lake-marina',
    name: 'Okanagan Lake Marina',
    lat: 49.891,
    lon: -119.4958,
    short: 'Luxury marina with boats and waterfront dining.',
    description: [
      'Okanagan Lake Marina is the perfect starting point for exploring the lake by boat or simply enjoying the lively waterfront atmosphere. Luxury yachts, sailing boats, and sightseeing cruises create an energetic setting throughout the summer months. Visitors can dine at nearby restaurants while watching boats arrive and depart from the harbor. The marina also offers boat rentals and guided lake tours.',
      "Evening visits provide beautiful sunset reflections across the water and a vibrant lakeside atmosphere. Shops, cafés, and public seating areas make it easy to spend several relaxing hours by the waterfront. Whether you're planning a cruise or simply enjoying the scenery, the marina is one of Kelowna's most popular destinations. It is conveniently located within walking distance of downtown attractions.",
    ],
    image: 'OkanaganLakeMarina',
  },
];
