import {
  BookHeart,
  Briefcase,
  Clock,
  CloudSun,
  Hand,
  Hash,
  HeartPulse,
  MapPinned,
  Music,
  Plane,
  ShoppingBag,
  Smile,
  TrainFront,
  UserRound,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

/** Ikon untuk setiap unit kurikulum. */
export const UNIT_ICONS: Record<string, LucideIcon> = {
  salam: Hand,
  kenalan: UserRound,
  angka: Hash,
  keluarga: Users,
  makan: UtensilsCrossed,
  waktu: Clock,
  arah: MapPinned,
  belanja: ShoppingBag,
  transportasi: TrainFront,
  kesehatan: HeartPulse,
  cuaca: CloudSun,
  kegiatan: Briefcase,
  hobi: Music,
  perjalanan: Plane,
  perasaan: Smile,
  cerita: BookHeart,
};

export function UnitIcon({ id, size = 20, className }: { id: string; size?: number; className?: string }) {
  const Icon = UNIT_ICONS[id] ?? Hash;
  return <Icon size={size} strokeWidth={2.2} className={className} aria-hidden />;
}
