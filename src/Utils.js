function getCurrentResolutionName() {
  if (screen.width >= 768) {
    return "desktop";
  } else if (screen.width >= 375) {
    return "tablet";
  } else {
    return "mobile";
  }
}
