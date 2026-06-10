# Renewal refused

**Brevo template ID:** 9  
**Trigger:** an admin refuses a renewal request

## Params

| Param | Description |
|-------|-------------|
| `params.firstName` | Resident's first name |
| `params.lastName` | Resident's last name |
| `params.refusalReasonLabel` | Human-readable refusal reason (one of: "Limite de capacité atteinte", "Documents falsifiés", "Documents incomplets", "Inéligibilité", "Comportement antérieur", "Autre") |

---

## Subject

```
Votre demande de renouvellement de séjour
```

## Body

```
Bonjour {{ params.firstName }},

Après examen de votre dossier, votre demande de renouvellement de séjour n'a pas pu être accordée.

Motif : {{ params.refusalReasonLabel }}

Pour toute question ou réclamation, rapprochez-vous de l'administration du campus.

L'administration du campus
```
