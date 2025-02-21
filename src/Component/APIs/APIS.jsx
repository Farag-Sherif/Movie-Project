const today = new Date().toISOString().split('T')[0]; 
export const sortMovies = `&sort_by=release_date.desc&release_date.lte=${today}`
export const sortSeries = `&sort_by=first_air_date.desc&first_air_date.lte=${today}`
export const Api = {
  baseURL: "https://api.themoviedb.org/3/",
  Key: "?api_key=b2e1a8e89ac1f06b81105a1d6620c53d",
  token:
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMmUxYThlODlhYzFmMDZiODExMDVhMWQ2NjIwYzUzZCIsIm5iZiI6MTczODYwODU2OS4zNTY5OTk5LCJzdWIiOiI2N2ExMGZiOWQwODExODE0YmUyNjQ4MWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.9tDrDThcBuAG6VITPp3ZFpROyBty_lCjvD9_qsfi_xw",
  baseURLImg: "https://image.tmdb.org/t/p/",
  sizeW500: "w500",
  sizeOriginal: "original",
  latestMovies: "movie/now_playing",
  trendingMovies: "trending/all/day",
  latestSeries: "tv/airing_today",
  popularSeries: "tv/popular",
  popularMovies: "movie/popular",
  searchMovie: "search/movie/",
  searchSeries: "search/tv/",
  searchMulti: "search/multi",
  searchCollection: "search/collection/",
  movie:'movie/',
  search: 'search/',
  series:'tv/',
  page: '&page=',
  arabicLanguage: '&language=ar',
  searchByCategory: "discover/",
  languages: '&with_original_language=ar&with_original_language=tr&with_original_language=ko&with_original_language=hi&with_original_language=bn&with_original_language=ja&with_original_language=zh&with_original_language=th&with_original_language=id&with_original_language=vi&with_original_language=en&with_original_language=fr&with_original_language=de&with_original_language=es&with_original_language=it&with_original_language=ru&with_original_language=pt&with_original_language=nl&with_original_language=sw&with_original_language=pl',
  wresting: `&query=WWE${sortSeries}`,
  moviesCategory: {
    Arabic: `&with_original_language=ar${sortMovies}`,
    Netflix:
      `&with_watch_providers=8&watch_region=US${sortMovies}`,
    Animation: `&with_genres=16${sortMovies}`,
    Foreign: `&without_original_language=ar,tr,hi${sortMovies}`,
    Indian: `&with_original_language=hi${sortMovies}`,
    Turkish: `&with_original_language=tr${sortMovies}`,
    Asian:
      `&with_original_language=ko&with_original_language=ja&with_original_language=zh&with_original_language=th&with_original_language=id&with_original_language=vi${sortMovies}`,
    Classic: `&primary_release_date.lte=1980-01-01${sortMovies}`,
    Dubbed: `&query=dubbed${sortMovies}`,
  },
  seriesCategory: {
    Arabic: `&with_original_language=ar${sortSeries}`,
    Netflix: `&with_networks=213${sortSeries}`,
    Animation: `&with_genres=16${sortSeries}`,
    Foreign: `&without_original_language=ar,tr,ko${sortSeries}`,
    Turkish: `&with_original_language=tr${sortSeries}`,
    Korean: `&with_original_language=ko${sortSeries}`,
    sport: `&with_genres=10767${sortSeries}`,
  },
};

export const languageCategories = {
  // اللغات العربية
  ar: "عربية",

  // اللغة التركية
  tr: "تركية",

  // اللغة الكورية
  ko: "كورية",

  // اللغة الهندية
  hi: "هندية",
  bn: "هندية",

  // اللغات الآسيوية (غير الكورية والهندية)
  ja: "آسيوية", // يابانية
  zh: "آسيوية", // صينية
  "zh-Hans": "آسيوية",
  "zh-Hant": "آسيوية",
  th: "آسيوية", // تايلاندية
  id: "آسيوية", // إندونيسية
  vi: "آسيوية", // فيتنامية

  // باقي اللغات = أجنبية
  en: "أجنبية",
  fr: "أجنبية",
  de: "أجنبية",
  es: "أجنبية",
  it: "أجنبية",
  ru: "أجنبية",
  pt: "أجنبية",
  nl: "أجنبية",
  sw: "أجنبية",
  pl: "أجنبية",
};
export const languageLinks = {
  // اللغات العربية
  ar: "Arabic",

  // اللغة التركية
  tr: "Turkish",

  // اللغة الكورية
  ko: "Korean",

  // اللغة الهندية
  hi: "Indian",
  bn: "Indian",

  // اللغات الآسيوية (غير الكورية والهندية)
  ja: "Asian", // يابانية
  zh: "Asian", // صينية
  "zh-Hans": "Asian",
  "zh-Hant": "Asian",
  th: "Asian", // تايلاندية
  id: "Asian", // إندونيسية
  vi: "Asian", // فيتنامية

  // باقي اللغات = أجنبية
  en: "Foreign",
  fr: "Foreign",
  de: "Foreign",
  es: "Foreign",
  it: "Foreign",
  ru: "Foreign",
  pt: "Foreign",
  nl: "Foreign",
  sw: "Foreign",
  pl: "Foreign",
};
export const countryCategories = {
  // الأفلام العربية
  EG: "عربية",
  SA: "عربية",
  AE: "عربية",
  DZ: "عربية",
  MA: "عربية",
  TN: "عربية",
  QA: "عربية",
  KW: "عربية",
  BH: "عربية",
  OM: "عربية",
  JO: "عربية",
  LB: "عربية",
  IQ: "عربية",
  SY: "عربية",
  SD: "عربية",
  YE: "عربية",

  // الأفلام التركية
  TR: "تركية",

  // الأفلام الكورية
  KR: "كورية",

  // الأفلام الهندية
  IN: "هندية",

  // الأفلام الآسيوية (غير الكورية والهندية)
  JP: "آسيوية",
  CN: "آسيوية",
  TH: "آسيوية",
  ID: "آسيوية",
  MY: "آسيوية",
  PH: "آسيوية",
  VN: "آسيوية",

  // باقي الدول = أجنبية
  US: "أجنبية",
  GB: "أجنبية",
  FR: "أجنبية",
  DE: "أجنبية",
  IT: "أجنبية",
  ES: "أجنبية",
  RU: "أجنبية",
  BR: "أجنبية",
  CA: "أجنبية",
  AU: "أجنبية",
  MX: "أجنبية",
  AR: "أجنبية",
  SE: "أجنبية",
  NO: "أجنبية",
  DK: "أجنبية",
  FI: "أجنبية",
  NL: "أجنبية",
  BE: "أجنبية",
  CH: "أجنبية",
  AT: "أجنبية",
  GR: "أجنبية",
  PT: "أجنبية",
  IR: "أجنبية",
  PK: "أجنبية",
  IL: "أجنبية",
  NZ: "أجنبية",
  ZA: "أجنبية",
  NG: "أجنبية",
  KE: "أجنبية",
  CZ: "أجنبية",
};
