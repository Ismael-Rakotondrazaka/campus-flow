# Housing application validated

**Brevo template ID:** 7  
**Trigger:** an admin validates a housing application and assigns a room — this also creates the resident's account

## Params

| Param | Description |
|-------|-------------|
| `params.firstName` | Resident's first name |
| `params.lastName` | Resident's last name |
| `params.email` | Resident's email (= login) |
| `params.buildingName` | Name of the assigned building |
| `params.floor` | Floor number |
| `params.roomNumber` | Room number |
| `params.temporaryPassword` | Auto-generated temporary password |
| `params.loginUrl` | Direct URL to the login page |

---

## Subject

```
Votre logement vous a été attribué
```

## Body

```
Bonjour {{ params.firstName }},

Votre logement est prêt. Voici vos informations :

Bâtiment : {{ params.buildingName }}
Étage : {{ params.floor }}
Chambre : {{ params.roomNumber }}

Un compte a été créé pour vous. Connectez-vous avec les identifiants suivants :

Email : {{ params.email }}
Mot de passe temporaire : {{ params.temporaryPassword }}

[Se connecter]({{{ params.loginUrl }}})

Changez votre mot de passe dès votre première connexion.

L'administration du campus
```

---

## Notes

- `params.loginUrl` is wrapped in triple braces `{{{ }}}` to prevent Brevo from escaping the URL
- The temporary password is randomly generated at the time the application is validated — it is single-use
