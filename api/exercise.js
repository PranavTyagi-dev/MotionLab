const BASE_URL = "https://wger.de/api/v2/exerciseinfo/";

export async function fetchExercises() {
  let response = await fetch(BASE_URL + "?language=2&limit=200");

  if (!response.ok) {
    throw new Error("Exercise API failed: " + response.status);
  }

  let data = await response.json();
  let results = Array.isArray(data.results) ? data.results : [];

  let exercises = results.map((item) => {
    let translation = item.translations && item.translations.length > 0 ? item.translations.find((t) => t.language === 2) || item.translations[0] : null;

    let muscle = item.muscles && item.muscles.length > 0 ? item.muscles[0] : null;
    let equipment = item.equipment && item.equipment.length > 0 ? item.equipment[0] : null;
    let name = translation && translation.name ? translation.name.trim() : "Unknown Exercise";
    let target = muscle ? (muscle.name_en || muscle.name || "unknown").trim().toLowerCase() : "unknown";
    let equipmentName = equipment ? (equipment.name || "bodyweight").trim().toLowerCase() : "bodyweight";
    let bodyPart = item.category && item.category.name ? item.category.name.trim().toLowerCase() : "unknown";

    return {
      id: item.id,
      name: name,
      target: target,
      equipment: equipmentName,
      bodyPart: bodyPart,
      gifUrl: "",
    };
  });
  return exercises;
}
