
import { Page, Resource } from './types';

export const NAV_LINKS: { name: Page }[] = [
  { name: 'Home' },
  { name: 'News' },
  { name: 'Report' },
  { name: 'Chat' },
  { name: 'Resources' },
];

export const RESOURCES_DATA: Resource[] = [
    {
        title: 'Cybercrime Reporting Portal (USA)',
        description: 'Official US government website for reporting cybercrime incidents to the FBI.',
        link: 'https://www.ic3.gov/',
        category: 'Helpline',
    },
    {
        title: 'National Cyber Security Centre (UK)',
        description: 'The UK\'s authority on cyber security. Report incidents and get guidance.',
        link: 'https://www.ncsc.gov.uk/',
        category: 'Helpline',
    },
    {
        title: 'Cyber Crime Reporting Portal (India)',
        description: 'Official Indian government website for reporting all types of cybercrime incidents.',
        link: 'https://cybercrime.gov.in/',
        category: 'Helpline',
    },
    {
        title: 'OWASP Top Ten',
        description: 'A standard awareness document for developers and web application security.',
        link: 'https://owasp.org/www-project-top-ten/',
        category: 'Guide',
    },
    {
        title: 'NIST Cybersecurity Framework',
        description: 'A set of standards, guidelines, and best practices to manage cybersecurity-related risk.',
        link: 'https://www.nist.gov/cyberframework',
        category: 'Guide',
    },
    {
        title: 'Have I Been Pwned?',
        description: 'Check if your email or phone is in a data breach.',
        link: 'https://haveibeenpwned.com/',
        category: 'Helpline',
    },
    {
        title: 'SANS Institute Reading Room',
        description: 'A large collection of information security research papers and articles.',
        link: 'https://www.sans.org/reading-room/',
        category: 'Guide',
    },
];