export interface Source { label: string; href: string }

/** Sources behind the report. Only claims that these pages actually support are cited. */
export const SOURCES: Source[] = [
  { label: 'WHO 2020 guidelines on physical activity and sedentary behaviour (BJSM): 150–300 min moderate or 75–150 min vigorous activity a week, plus muscle strengthening', href: 'https://bjsm.bmj.com/content/54/24/1451' },
  { label: 'AASM/SRS consensus statement: adults should sleep 7 or more hours a night', href: 'https://aasm.org/seven-or-more-hours-of-sleep-per-night-a-health-necessity-for-adults/' },
  { label: 'ACE summary of the ACSM pre-participation screening guidelines: medical clearance for people with known disease before vigorous exercise', href: 'https://www.acefitness.org/resources/pros/expert-articles/6921/new-preparticipation-screening-guidelines-what-health-and-fitness-pros-need-to-know/' },
  { label: 'NHS Couch to 5K: 9-week run/walk plan, 3 runs a week with rest days between', href: 'https://www.nhs.uk/better-health/get-active/get-running-with-couch-to-5k/couch-to-5k-running-plan/' },
  { label: 'CDC: the talk test for measuring intensity', href: 'https://www.cdc.gov/physicalactivity/basics/measuring/index.html' },
  { label: 'Outside: "The myth of the 10 percent rule"', href: 'https://www.outsideonline.com/health/running/training-advice/running-101/myth-of-the-10-percent-rule/' },
  { label: 'Garmin-RUNSAFE study coverage (LIH): injury risk tied to a single run far longer than your recent longest, not to weekly percentage increases', href: 'https://www.lih.lu/en/article/new-research-challenges-decades-of-assumptions-about-running-injuries/' },
  { label: 'HSS study: larger jumps in marathon training volume linked to more injuries', href: 'https://news.hss.edu/hss-study-shows-greater-increases-in-training-volume-associated-with-higher-risk-of-injuries-among-marathon-runners/' },
  { label: 'Does polarized training improve performance in recreational runners? (research record; evidence is mixed)', href: 'https://abacus.universidadeuropea.com/entities/publication/e453045b-50fb-4586-89a8-a3d550db3ce1' },
  { label: 'Fitness First beginner marathon guide: typical 16–20 week plan after an 8–12 week base (coaching blog, not peer-reviewed)', href: 'https://fitnessfirst.co.uk/blog/beginner-marathon-training-plan' },
];
