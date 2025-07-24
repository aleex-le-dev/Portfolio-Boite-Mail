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

// Affiché par ordre alphabétique
export const LABELS = [
  {
    label: 'Projets',
    subs: ['Web', 'Mobile', 'Design',]
  },
  {
    label: 'A propos de moi',
    subs: ['Exemple 2', 'Exemple 1']
  }
]; 