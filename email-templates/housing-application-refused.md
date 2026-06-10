# Housing application refused

**Brevo template ID:** 6  
**Trigger:** an admin refuses a housing application

## Params

| Param | Description |
|-------|-------------|
| `params.firstName` | Applicant's first name |
| `params.lastName` | Applicant's last name |
| `params.refusalReasonLabel` | Human-readable refusal reason (one of: "Limite de capacité atteinte", "Documents falsifiés", "Documents incomplets", "Inéligibilité", "Comportement antérieur", "Autre") |

---

## Subject

```
Votre demande de logement
```

## Body

```
Bonjour {{ params.firstName }},

Après examen de votre dossier, votre demande de logement n'a pas pu être acceptée.

Motif : {{ params.refusalReasonLabel }}

Si vous souhaitez obtenir des précisions ou contester cette décision, contactez l'administration du campus.

L'administration du campus
```
