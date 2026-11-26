export type IssueStatus = 'reported' | 'inprogress' | 'resolved';
export type IssueCategory = 'pothole' | 'streetlight' | 'graffiti' | 'sidewalk' | 'drainage' | 'signage' | 'parks' | 'water' | 'electricity' | 'other';

export interface Issue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  address: string;
  neighborhood: string;
  city: string;
  lat: number;
  lng: number;
  reportedBy: string;
  reportedAt: string;
  updatedAt: string;
  upvotes: number;
  photoUrl?: string;
  statusHistory: { status: IssueStatus; date: string; note: string }[];
}

export const CATEGORY_LABELS: Record<IssueCategory, string> = {
  pothole: 'Bache',
  streetlight: 'Alumbrado',
  graffiti: 'Graffiti',
  sidewalk: 'Acera',
  drainage: 'Drenaje',
  signage: 'Señalización',
  parks: 'Parques y árboles',
  water: 'Agua y aguas negras',
  electricity: 'Electricidad',
  other: 'Otro',
};

export const CATEGORY_SHORT_LABELS: Record<IssueCategory, string> = {
  pothole: 'BA',
  streetlight: 'AL',
  graffiti: 'GR',
  sidewalk: 'AC',
  drainage: 'DR',
  signage: 'SE',
  parks: 'PA',
  water: 'AG',
  electricity: 'EL',
  other: 'OT',
};

export const STATUS_LABELS: Record<IssueStatus, string> = {
  reported: 'Reportado',
  inprogress: 'En reparación',
  resolved: 'Resuelto',
};

export const SAMPLE_ISSUES: Issue[] = [
  {
    id: '1',
    title: 'Bache profundo en la Alameda Roosevelt',
    description: 'Un bache ancho en el carril hacia el oriente, cerca del Parque Cuscatlán, obliga a los conductores a invadir el siguiente carril y pone en riesgo a los motociclistas.',
    category: 'pothole',
    status: 'inprogress',
    address: 'Alameda Roosevelt, cerca de la 25 Avenida Sur',
    neighborhood: 'Colonia Flor Blanca',
    city: 'San Salvador',
    lat: 13.698,
    lng: -89.218,
    reportedBy: 'María J.',
    reportedAt: '2025-02-28T09:15:00Z',
    updatedAt: '2025-03-05T14:30:00Z',
    upvotes: 87,
    photoUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=440&fit=crop&auto=format',
    statusHistory: [
      { status: 'reported', date: '2025-02-28T09:15:00Z', note: 'Reporte enviado y ubicación confirmada por los residentes.' },
      { status: 'inprogress', date: '2025-03-05T14:30:00Z', note: 'Cuadrilla de mantenimiento municipal asignada y reparación programada.' },
    ],
  },
  {
    id: '2',
    title: 'Luminarias apagadas en la Avenida El Espino',
    description: 'Cinco luminarias no funcionan cerca de la ruta peatonal. La cuadra queda completamente oscura después del atardecer.',
    category: 'streetlight',
    status: 'resolved',
    address: 'Avenida El Espino',
    neighborhood: 'Antiguo Cuscatlán',
    city: 'La Libertad',
    lat: 13.674,
    lng: -89.247,
    reportedBy: 'Carlos A.',
    reportedAt: '2025-02-10T20:45:00Z',
    updatedAt: '2025-02-24T10:00:00Z',
    upvotes: 64,
    photoUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=700&h=440&fit=crop&auto=format',
    statusHistory: [
      { status: 'reported', date: '2025-02-10T20:45:00Z', note: 'Reporte enviado por un residente de la zona.' },
      { status: 'inprogress', date: '2025-02-18T09:00:00Z', note: 'El equipo eléctrico inspeccionó el circuito afectado.' },
      { status: 'resolved', date: '2025-02-24T10:00:00Z', note: 'Se repararon las luminarias y se probaron las cinco luces.' },
    ],
  },
  {
    id: '3',
    title: 'Desborde de aguas negras cerca del Mercado Central',
    description: 'Las aguas negras salen de un drenaje bloqueado y atraviesan el paso peatonal. El mal olor y el agua estancada representan un riesgo para la salud pública.',
    category: 'water',
    status: 'reported',
    address: '8.ª Calle Poniente, cerca de la Avenida España',
    neighborhood: 'Centro Histórico',
    city: 'San Salvador',
    lat: 13.7,
    lng: -89.194,
    reportedBy: 'José R.',
    reportedAt: '2025-03-10T07:30:00Z',
    updatedAt: '2025-03-10T07:30:00Z',
    upvotes: 112,
    photoUrl: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=700&h=440&fit=crop&auto=format',
    statusHistory: [
      { status: 'reported', date: '2025-03-10T07:30:00Z', note: 'Reporte marcado como urgente tras la confirmación de comerciantes cercanos.' },
    ],
  },
  {
    id: '4',
    title: 'Acera dañada frente a una escuela',
    description: 'Una sección hundida de la acera obliga a los estudiantes a caminar por la calle durante la entrada y la salida. La zona necesita barreras y una reparación urgente.',
    category: 'sidewalk',
    status: 'inprogress',
    address: '10a Avenida Sur',
    neighborhood: 'Barrio San Sebastián',
    city: 'Santa Ana',
    lat: 13.99,
    lng: -89.558,
    reportedBy: 'Ana P.',
    reportedAt: '2025-02-20T08:00:00Z',
    updatedAt: '2025-03-01T16:00:00Z',
    upvotes: 93,
    photoUrl: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?w=700&h=440&fit=crop&auto=format',
    statusHistory: [
      { status: 'reported', date: '2025-02-20T08:00:00Z', note: 'Reporte enviado por familias de la comunidad educativa.' },
      { status: 'inprogress', date: '2025-03-01T16:00:00Z', note: 'Inspección del lugar completada y cuadrilla de reparación asignada.' },
    ],
  },
  {
    id: '5',
    title: 'Corte de energía prolongado en zona residencial',
    description: 'Varias viviendas no tienen energía desde ayer. Las cuadras cercanas sí cuentan con servicio, lo que sugiere una falla local en el transformador o la línea.',
    category: 'electricity',
    status: 'resolved',
    address: 'Calle La Reforma',
    neighborhood: 'Colonia Escalón',
    city: 'San Salvador',
    lat: 13.705,
    lng: -89.238,
    reportedBy: 'Sofía M.',
    reportedAt: '2025-02-02T15:20:00Z',
    updatedAt: '2025-02-06T12:00:00Z',
    upvotes: 148,
    photoUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=700&h=440&fit=crop&auto=format',
    statusHistory: [
      { status: 'reported', date: '2025-02-02T15:20:00Z', note: 'Corte reportado por residentes de la cuadra afectada.' },
      { status: 'inprogress', date: '2025-02-04T10:00:00Z', note: 'Cuadrilla de la distribuidora enviada y falla del transformador identificada.' },
      { status: 'resolved', date: '2025-02-06T12:00:00Z', note: 'Transformador reparado y servicio restablecido.' },
    ],
  },
  {
    id: '6',
    title: 'Falta señal de alto en una intersección transitada',
    description: 'La señal de alto lleva varios días desaparecida. Los conductores cruzan a alta velocidad y los residentes han reportado varios incidentes por poco.',
    category: 'signage',
    status: 'reported',
    address: 'Avenida Roosevelt Sur y 9.ª Calle Poniente',
    neighborhood: 'Centro',
    city: 'San Miguel',
    lat: 13.482,
    lng: -88.178,
    reportedBy: 'Luis V.',
    reportedAt: '2025-03-08T07:45:00Z',
    updatedAt: '2025-03-08T07:45:00Z',
    upvotes: 39,
    photoUrl: 'https://tse3.mm.bing.net/th/id/OIP.AMx7yjnya0inDlhOxqb-vAHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    statusHistory: [
      { status: 'reported', date: '2025-03-08T07:45:00Z', note: 'Reporte enviado con fotografías de la intersección.' },
    ],
  },
  {
    id: '7',
    title: 'Tragante bloqueado cerca del Parque Daniel Hernández',
    description: 'El drenaje principal está lleno de basura. Las lluvias fuertes dejan agua estancada y profunda sobre la calle, e impiden el paso peatonal.',
    category: 'drainage',
    status: 'inprogress',
    address: '2a Calle Poniente',
    neighborhood: 'Centro',
    city: 'Santa Tecla',
    lat: 13.676,
    lng: -89.279,
    reportedBy: 'Gabriela C.',
    reportedAt: '2025-03-03T13:00:00Z',
    updatedAt: '2025-03-07T09:30:00Z',
    upvotes: 55,
    photoUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=440&fit=crop&auto=format',
    statusHistory: [
      { status: 'reported', date: '2025-03-03T13:00:00Z', note: 'Problema reportado después de varias inundaciones en la calle.' },
      { status: 'inprogress', date: '2025-03-07T09:30:00Z', note: 'Cuadrilla de drenajes enviada para limpiar e inspeccionar la tubería.' },
    ],
  },
  {
    id: '8',
    title: 'Grafiti en una fachada histórica restaurada',
    description: 'Un grafiti reciente cubre parte de una fachada restaurada cerca de la catedral. La superficie necesita una limpieza cuidadosa para evitar más daños.',
    category: 'graffiti',
    status: 'resolved',
    address: 'Avenida Independencia Sur',
    neighborhood: 'Centro Histórico',
    city: 'Santa Ana',
    lat: 13.994,
    lng: -89.56,
    reportedBy: 'Daniela H.',
    reportedAt: '2025-02-25T17:00:00Z',
    updatedAt: '2025-03-02T11:00:00Z',
    upvotes: 31,
    photoUrl: 'https://tse3.mm.bing.net/th/id/OIP.M0ZEZYW9e34PJP5zbuqfjQHaFX?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    statusHistory: [
      { status: 'reported', date: '2025-02-25T17:00:00Z', note: 'Daño documentado y enviado para revisión.' },
      { status: 'inprogress', date: '2025-02-28T08:00:00Z', note: 'Método de limpieza seguro para el patrimonio aprobado.' },
      { status: 'resolved', date: '2025-03-02T11:00:00Z', note: 'Fachada limpiada y recubrimiento protector aplicado.' },
    ],
  },
];
