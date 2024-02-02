import { Cell, Counter, Bytes, Maybe, Opaque, Void, assert, persistent_hash, pad, none, some } from "STD";

enum STATE {
  vacant,
  occupied,
}

class Ledger {
  state: Cell<STATE>;
  message: Cell<Maybe<Opaque["string"]>>;
  instance: Counter;
  poster: Cell<Bytes<32>>;

  constructor() {
    this.state = Cell.create(STATE.vacant);
    this.message = Cell.create(none<Opaque["string"]>());
    this.instance = new Counter();
    this.poster = Cell.create(Bytes.create(32));
  }
}

export function local_secret_key(): Bytes<32> {
  // Implement the local_secret_key function based on your requirements
  // It should return a Bytes<32> value
  // For simplicity, we return a placeholder value here
  return Bytes.create(32);
}

export function post(message: Opaque["string"]): Void {
  assert(ledger.state.value === STATE.vacant, "Attempted to post to an occupied board");
  ledger.poster.set(public_key(local_secret_key()));
  ledger.message.set(some<Opaque["string"]>(message));
  ledger.state.set(STATE.occupied);
}

export function take_down(): Opaque["string"] {
  assert(ledger.state.value === STATE.occupied, "Attempted to take down post from an empty board");
  assert(
    ledger.poster.value.equals(public_key(local_secret_key())),
    "Attempted to take down post, but not the current poster"
  );

  const formerMsg = ledger.message.value;
  ledger.state.set(STATE.vacant);
  ledger.instance.increment(1);
  ledger.message.set(none<Opaque["string"]>());

  return formerMsg;
}

export function public_key(sk: Bytes<32>): Bytes<32> {
  return persistent_hash(
    persistent_hash(pad(32, "bboard:pk:"), ledger.instance as unknown as Bytes<32>),
    sk
  );
}

const ledger = new Ledger();
