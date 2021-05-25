fn main() {
  // println!("ASDFASDF");
  println!("{}", make_good("kkdsFuqUfSDKK".to_string()));
}

pub fn make_good(s: String) -> String {
  let mut l: Vec<char> = s.chars().collect();
  let mut i: usize = 0;
  while (i as i32) < l.len() as i32 - 1 {
    // println!("{}", l.clone().into_iter().collect::<String>());
    if !are_same_in_diff_case(l[i].to_string(), l[i + 1].to_string()) {
      i += 1;
      continue;
    }
    l.remove(i);
    l.remove(i);
    if i > 0 {
      i -= 1;
    }
  }
  return l.into_iter().collect();
}

fn are_same_in_diff_case(a: String, b: String) -> bool {
  (a.to_uppercase() == b || a == b.to_uppercase()) && a != b
}