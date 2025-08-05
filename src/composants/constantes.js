// Catégories principales de navigation
import { MdInbox, MdSend, MdLabelImportant, MdArchive, MdSchedule, MdDelete } from "react-icons/md";

export const NAV_CATEGORIES = [
  { label: 'Boîte de réception', value: 'Boîte de réception', icon: MdInbox },
  { label: 'Messages envoyés', value: 'Messages envoyés', icon: MdSend },
  { label: 'Important', value: 'Important', icon: MdLabelImportant },
  { label: 'Archive', value: 'Archive', icon: MdArchive },
  { label: 'Brouillons', value: 'Brouillons', icon: MdSchedule },
  { label: 'Corbeille', value: 'Corbeille', icon: MdDelete },
];

// Catégories de projets
// export const PROJECT_CATEGORIES = ['Portfolio', 'React Native', 'E-commerce'];
export const PROJECT_CATEGORIES = [ 'WordPress', 'React Native', 'React', 'Portfolio'];

// Couleurs par catégorie de projet
export const PROJECT_CATEGORY_COLORS = {
  // 'Portfolio': '#2E8B57', // Sea Green
  'React Native': '#4169E1', // Royal Blue
  'WordPress': '#FF6B35', // Orange
  'React': '#61DAFB', // React Blue
  'Portfolio': 'black', 
  'default': 'black'
};

// Affiché par ordre alphabétique
export const LABELS = [
  {
    label: 'Mes projets',
    subs: PROJECT_CATEGORIES
  },
  {
    label: 'Mes certifications',
    subs: []
  }
];

// Mes infos
export const USERNAME = 'Alexandre Janacek';
export const USER_EMAIL = 'alexandre.janacek@gmail.com';
export const USER_AVATAR = 'https://media.licdn.com/dms/image/v2/D4E03AQHsjLWbL7ML0g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1672497184613?e=2147483647&v=beta&t=pHUPGHFTtXxg-xkAMXqpxoFItxeqD6u3jm-0ZlYUm0o'; 