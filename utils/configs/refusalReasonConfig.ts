import { RefusalReason } from "@prisma/client";

export const refusalReasonConfig: Record<RefusalReason, string> = {
  CAPACITY_LIMIT_REACHED:
    "La limite de capacité de notre campus a été atteinte.",
  INCOMPLETE_DOCUMENTS: "Votre dossier est incomplet.",
  FALSIFIED_DOCUMENTS: "Votre dossier contient des documents falsifiés.",
  PAST_BEHAVIOR: "Votre comportement passé ne respecte pas nos normes",
  INELIGIBILITY:
    "D'après nos critères d'éligibilité, vous ne remplissez pas les conditions requises.",
  OTHER:
    "Autre problème non spécifié pour le moment. Veuillez contacter le support pour obtenir de l'aide.",
};
