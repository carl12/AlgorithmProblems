use std::char;
use std::iter;

fn main() {}

fn find_kth_bit(n: i32, k: i32) -> char {
  let arr = make_nth_binary(n);
  let num: bool = arr[k as usize];
  return char::from_digit(num as u32, 2).unwrap();
}

fn make_nth_binary(n: i32) -> Vec<bool> {
  let mut curr = Vec::new();
  curr.push(false);
  for _ in 1 .. n {
    curr = curr.iter().cloned().chain(iter::once(true)).chain(
      curr.iter().cloned().rev().map(|el| {
        return !el;
      })
    ).collect();
  }
  curr
}