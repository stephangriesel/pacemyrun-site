import type { Answers } from './questionnaire.ts';
import { SOURCES, type Source } from './sources.ts';

export interface Section {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  links?: Source[];
}

/**
 * Typical build-up before a goal. Only the beginner 5K (NHS Couch to 5K) and the
 * marathon figures (16–20 week plan after an 8–12 week base) have a cited source;
 * the rest are common coaching rules of thumb and vary a lot between people.
 */
const WEEKS: Record<Answers['goal'], Record<Answers['experience'], string>> = {
  '5k': { beginner: '9 weeks (NHS Couch to 5K)', intermediate: '4–6 weeks', advanced: '3–4 weeks' },
  '10k': { beginner: '10–12 weeks', intermediate: '8 weeks', advanced: '6 weeks' },
  '21k': { beginner: '20 weeks', intermediate: '12–14 weeks', advanced: '10–12 weeks' },
  '42k': { beginner: 'about 24–32 weeks (8–12 weeks of base-building, then a 16–20 week plan)', intermediate: '16–20 weeks', advanced: '16–18 weeks' },
  healthy: { beginner: 'ongoing', intermediate: 'ongoing', advanced: 'ongoing' },
};

const GOAL_NAME: Record<Answers['goal'], string> = {
  '5k': 'a comfortable 5 km',
  '10k': 'a comfortable 10 km',
  '21k': 'a half marathon',
  '42k': 'a marathon',
  healthy: 'staying healthy with 3 runs a week',
};

export function bmi(a: Pick<Answers, 'height' | 'weight'>): number {
  const m = a.height / 100;
  return a.weight / (m * m);
}

export function buildReport(a: Answers): Section[] {
  const activeDays = Number(a.exercise);
  const lowBase = (a.walk === 'lt15' || a.walk === '15-30') && activeDays <= 1;
  const highBmi = bmi(a) >= 30;
  const hasCondition = a.conditions.length > 0;
  const needsClearance = hasCondition;
  const runsPerWeek = a.goal === 'healthy' ? 3 : { beginner: 3, intermediate: 4, advanced: 5 }[a.experience];

  const intro: Section = {
    title: 'Introduction',
    paragraphs: [
      `Thanks for answering the questionnaire. You describe yourself as ${a.experience === 'beginner' ? 'a' : 'an'} ${a.experience} runner aiming for ${GOAL_NAME[a.goal]}. The plan below is general guidance built from your answers, so adjust it to how your body responds.`,
    ],
  };

  const exercise: Section = {
    title: 'Exercise',
    paragraphs: [
      lowBase
        ? 'Your everyday activity is low at the moment, so the first job is building a habit rather than speed. Add a daily 20–30 minute walk before you worry about running volume.'
        : 'You already have a reasonable activity base, which will help you adapt to running faster.',
    ],
    bullets: [
      `Aim for about ${runsPerWeek} runs a week, with a rest day between runs while you are building up (as the NHS Couch to 5K plan does).`,
      'Keep most runs at an easy effort: you should be able to talk but not sing (the CDC talk test).',
      'The WHO suggests 150–300 minutes of moderate or 75–150 minutes of vigorous activity a week, and muscle-strengthening work on at least 2 days.',
      'Build up gradually. The "10% a week" rule is popular but has little research behind it. Avoid big jumps in weekly volume, and avoid a single run much longer than your recent longest run, which is the pattern linked to injuries.',
      'Many coaches schedule an easier week every third or fourth week. This is common practice rather than a proven rule.',
      ...(highBmi
        ? ['If you carry extra weight, consider run/walk intervals, softer surfaces and cushioned shoes, and cross-training such as cycling or swimming on non-running days. This is a general precaution.']
        : []),
    ],
  };

  const experience: Section = {
    title: 'Experience',
    paragraphs: [],
    bullets: {
      beginner: [
        'Start with run/walk intervals. NHS Couch to 5K begins with 1 minute of running and 1.5 minutes of walking for 20 minutes, and builds to 30 minutes of continuous running over 9 weeks.',
        'Run at a pace that feels comfortable. Slow is fine.',
        'Add two short strength sessions a week (squats, lunges, calf raises, planks).',
      ],
      intermediate: [
        'Keep one long easy run each week and make it your gradual progression.',
        'Add one quality session a week, such as tempo running or intervals, and keep the rest easy.',
        'Include strength work twice a week to stay robust as mileage rises.',
      ],
      advanced: [
        'Many coaches use roughly 80% easy running and 20% hard running. It is well documented in elite athletes, but studies in recreational runners are mixed, so treat it as a starting point.',
        'Rotate quality sessions between intervals, tempo and long runs with race-pace segments.',
        'Plan recovery weeks and track fatigue, since the main risk at your level is overtraining.',
      ],
    }[a.experience],
  };

  const goalBullets: string[] = [];
  if (a.goal === 'healthy') {
    goalBullets.push('Run three times a week: two easy runs of 20–40 minutes and one slightly longer or more playful run (strides or short intervals).');
  } else {
    goalBullets.push(`Typical build-up for your goal and experience: ${WEEKS[a.goal][a.experience]}.`);
    if (a.goal === '42k' && a.experience !== 'advanced') {
      goalBullets.push('Consider running a 10 km and a half marathon first. A marathon builds best on a solid base of at least a year of consistent running.');
    }
    if (a.goal === '21k' && a.experience === 'beginner') {
      goalBullets.push('Reach a comfortable 10 km first, then follow a half-marathon plan.');
    }
    goalBullets.push('Use the pace calculator to set a realistic target time and a negative-split race plan.');
  }
  const goal: Section = {
    title: 'Goal',
    paragraphs: [`Your goal is ${GOAL_NAME[a.goal]}.`],
    bullets: goalBullets,
  };

  const sleep: Section = {
    title: 'Sleep',
    paragraphs: [
      {
        good: 'Your sleep meets the 7-or-more-hours recommendation for adults. Protect it, especially before long runs.',
        ok: 'You are close to, or just under, the 7 hours the AASM and Sleep Research Society recommend for adults. Aim for 7 or more as your mileage increases.',
        short: 'Regularly sleeping under 7 hours is linked to poorer health and recovery. Until that improves, keep training conservative and avoid hard sessions after bad nights.',
        veryshort: 'Very little sleep makes training harder and injuries more likely. Prioritise sleep first, and if it is persistently this low, speak with a doctor.',
      }[a.sleep],
    ],
    bullets: a.sleep === 'good'
      ? undefined
      : ['Keep a consistent bedtime and wake time.', 'Avoid screens and caffeine in the hour before bed.', 'Schedule runs earlier in the day if evening runs leave you wired.'],
  };

  const conditionNotes: Record<Answers['conditions'][number], string> = {
    heart: 'Heart disease: running is vigorous exercise, so get your doctor\'s clearance and ask what intensity is safe for you.',
    bp: 'High blood pressure: talk to your doctor about whether and how to start running, and about monitoring.',
    stroke: 'Stroke or TIA: check with your doctor before starting, and build up very gradually.',
    depression: 'Depression: physical activity is generally recommended for mental health, but it should complement professional care. Mention your plans to whoever supports you.',
  };
  const health: Section = {
    title: 'Health Risks',
    paragraphs: [
      needsClearance
        ? 'You listed a medical condition. Screening guidance (ACSM) recommends medical clearance before vigorous exercise such as running for people with known disease, so please see your doctor before starting or increasing your training.'
        : 'You reported none of the listed conditions. If you have other health concerns, or symptoms during exercise, check with a doctor.',
    ],
    bullets: [
      ...a.conditions.map((c) => conditionNotes[c]),
      'Stop and seek medical help if you feel chest pain, dizziness, unusual shortness of breath or irregular heartbeats.',
    ],
  };

  const conclusion: Section = {
    title: 'Conclusion',
    paragraphs: [
      'Consistency beats intensity. Start easier than you think you should, progress gradually and listen to your body. Revisit this questionnaire as your fitness changes.',
      'This is general information, not medical advice.',
    ],
  };

  const sources: Section = {
    title: 'Sources and caveats',
    paragraphs: [
      'The activity, sleep, screening, beginner-plan and talk-test guidance comes from the sources below. Training timelines other than the beginner 5K and the marathon are common rules of thumb, not from a single study. This report has not been reviewed by a doctor or qualified coach.',
    ],
    links: SOURCES,
  };

  return [intro, exercise, experience, goal, sleep, health, conclusion, sources];
}
