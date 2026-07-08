const images: Record<string, number> = {
  // Splash
  SplashBackground: require('./hotel-lounge-splash-bg.png'),
  SplashCards: require('./hotel-lounge-splash-cards.png'),

  // Onboarding
  OnboardWelcome: require('./hotel-lounge-onboard-welcome.png'),
  OnboardEvents: require('./hotel-lounge-onboard-events.png'),
  OnboardDining: require('./hotel-lounge-onboard-dining.png'),
  OnboardStay: require('./hotel-lounge-onboard-stay.png'),

  // Home
  HomeHero: require('./hotel-lounge-home-hero.png'),

  // Tab bar icons
  TabHome: require('./hotel-lounge-tab-home.png'),
  TabDining: require('./hotel-lounge-tab-dining.png'),
  TabEvents: require('./hotel-lounge-tab-events.png'),
  TabNearby: require('./hotel-lounge-tab-nearby.png'),
  TabClimate: require('./hotel-lounge-tab-climate.png'),
  TabSaved: require('./hotel-lounge-tab-saved.png'),

  // Menu — Starters
  CaesarSalad: require('./hotel-lounge-menu-caesar-salad.png'),
  SmokedSalmonCrostini: require('./hotel-lounge-menu-smoked-salmon-crostini.png'),
  CrispyCalamari: require('./hotel-lounge-menu-crispy-calamari.png'),
  BruschettaTrio: require('./hotel-lounge-menu-bruschetta-trio.png'),
  TruffleFries: require('./hotel-lounge-menu-truffle-fries.png'),

  // Menu — Mains
  GrilledAtlanticSalmon: require('./hotel-lounge-menu-grilled-atlantic-salmon.png'),
  RibeyeSteak: require('./hotel-lounge-menu-ribeye-steak.png'),
  ChickenAlfredoPasta: require('./hotel-lounge-menu-chicken-alfredo-pasta.png'),
  MushroomRisotto: require('./hotel-lounge-menu-mushroom-risotto.png'),
  GourmetBeefBurger: require('./hotel-lounge-menu-gourmet-beef-burger.png'),

  // Menu — Desserts
  NewYorkCheesecake: require('./hotel-lounge-menu-new-york-cheesecake.png'),
  ChocolateLavaCake: require('./hotel-lounge-menu-chocolate-lava-cake.png'),
  CremeBrulee: require('./hotel-lounge-menu-creme-brulee.png'),
  SeasonalFruitPlate: require('./hotel-lounge-menu-seasonal-fruit-plate.png'),
  MaplePecanTart: require('./hotel-lounge-menu-maple-pecan-tart.png'),

  // Menu — Drinks
  FreshOrangeJuice: require('./hotel-lounge-menu-fresh-orange-juice.png'),
  Cappuccino: require('./hotel-lounge-menu-cappuccino.png'),
  IcedMatchaLatte: require('./hotel-lounge-menu-iced-matcha-latte.png'),
  SparklingLemonade: require('./hotel-lounge-menu-sparkling-lemonade.png'),
  SignatureBerryMocktail: require('./hotel-lounge-menu-signature-berry-mocktail.png'),

  // Events
  OkanaganWineTasting: require('./hotel-lounge-event-okanagan-wine-tasting.png'),
  SunsetVineyardDinner: require('./hotel-lounge-event-sunset-vineyard-dinner.png'),
  ChefsSeasonalTasting: require('./hotel-lounge-event-chefs-seasonal-tasting.png'),
  LakesideJazzNight: require('./hotel-lounge-event-lakeside-jazz-night.png'),
  AcousticFolkEvening: require('./hotel-lounge-event-acoustic-folk-evening.png'),
  SunsetDJRooftop: require('./hotel-lounge-event-sunset-dj-rooftop.png'),
  SunriseLakesideYoga: require('./hotel-lounge-event-sunrise-lakeside-yoga.png'),
  ForestMeditationWalk: require('./hotel-lounge-event-forest-meditation-walk.png'),
  SpaWellnessWorkshop: require('./hotel-lounge-event-spa-wellness-workshop.png'),
  GuidedKayakTour: require('./hotel-lounge-event-guided-kayak-tour.png'),
  ScenicEBikeAdventure: require('./hotel-lounge-event-scenic-ebike-adventure.png'),
  SunsetPaddleboard: require('./hotel-lounge-event-sunset-paddleboard.png'),

  // Nearby attractions
  KnoxMountainPark: require('./hotel-lounge-nearby-knox-mountain-park.png'),
  WaterfrontPark: require('./hotel-lounge-nearby-waterfront-park.png'),
  MyraCanyonTrestles: require('./hotel-lounge-nearby-myra-canyon-trestles.png'),
  OkanaganLavenderFarm: require('./hotel-lounge-nearby-okanagan-lavender-farm.png'),
  MissionCreekGreenway: require('./hotel-lounge-nearby-mission-creek-greenway.png'),
  SummerhillPyramidWinery: require('./hotel-lounge-nearby-summerhill-pyramid-winery.png'),
  KasugaiGardens: require('./hotel-lounge-nearby-kasugai-gardens.png'),
  OkanaganLakeMarina: require('./hotel-lounge-nearby-okanagan-lake-marina.png'),
};

export const getImage = (key: string): number => images[key];
