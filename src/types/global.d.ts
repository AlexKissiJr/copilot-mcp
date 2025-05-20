// Add missing CloseEvent type for Phoenix
interface CloseEvent extends Event {
  readonly code: number;
  readonly reason: string;
  readonly wasClean: boolean;
}
