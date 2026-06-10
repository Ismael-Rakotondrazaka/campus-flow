# Housing application accepted

**Brevo template ID:** 5  
**Trigger:** an admin accepts a housing application (the file is reviewed and approved, before room assignment)

## Params

| Param | Description |
|-------|-------------|
| `params.firstName` | Applicant's first name |
| `params.lastName` | Applicant's last name |

---

## Subject

```
Votre demande de logement a été acceptée
```

## Body

```
Bonjour {{ params.firstName }},

Votre demande de logement a été examinée et acceptée.

La prochaine étape est l'attribution d'un logement. Vous recevrez un nouvel email dès qu'un logement vous aura été assigné, avec les informations pour accéder à votre espace personnel.

Pour toute question, contactez directement l'administration du campus.

L'administration du campus
```
