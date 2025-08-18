export const getPatientInitials = (name: string): string => {
  return name.charAt(0).toUpperCase();
};

export const calculateAge = (birthDate: string): string => {
  const birth = new Date(birthDate);
  const today = new Date();
  const ageInMs = today.getTime() - birth.getTime();
  const ageInYears = Math.floor(ageInMs / (1000 * 60 * 60 * 24 * 365.25));
  const ageInMonths = Math.floor(
    (ageInMs % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44)
  );

  if (ageInYears > 0) {
    return `${ageInYears} año${ageInYears > 1 ? "s" : ""}`;
  } else {
    return `${ageInMonths} mes${ageInMonths > 1 ? "es" : ""}`;
  }
};

export const getSpeciesIcon = (type: string) => {
  // Mapeo directo del tipo de especie a la clave del objeto speciesIcons
  const validTypes = ['perro', 'gato', 'ave', 'conejo', 'hamster', 'tortuga', 'pez', 'huron', 'otro'] as const;
  return (validTypes as readonly string[]).includes(type) ? type : 'otro';
};
