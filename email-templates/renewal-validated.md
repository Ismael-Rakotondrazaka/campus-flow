# Renewal validated

**Brevo template ID:** 10  
**Trigger:** an admin moves the renewal to `validated` — final confirmation step, only reachable after the renewal was already `accepted`. This is a terminal status: no further changes are possible after this.

## Params

| Param | Description |
|-------|-------------|
| `params.firstName` | Resident's first name |
| `params.lastName` | Resident's last name |

---

## Subject

```
Votre renouvellement de séjour est confirmé
```

## Body

```
Bonjour {{ params.firstName }},

Votre renouvellement de séjour est maintenant confirmé. Votre dossier est entièrement traité.

L'administration du campus
```
