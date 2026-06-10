# Renewal accepted

**Brevo template ID:** 8  
**Trigger:** an admin moves the renewal to `accepted` — first approval step, the resident's academic session is extended at this point. A second step (`validated`) is still required to fully close the renewal.

## Params

| Param | Description |
|-------|-------------|
| `params.firstName` | Resident's first name |
| `params.lastName` | Resident's last name |

---

## Subject

```
Votre renouvellement de séjour a été accepté
```

## Body

```
Bonjour {{ params.firstName }},

Votre demande de renouvellement de séjour a été acceptée. Votre inscription pour la nouvelle année académique a été enregistrée.

Un dernier email de confirmation vous sera envoyé une fois votre dossier entièrement traité.

L'administration du campus
```
