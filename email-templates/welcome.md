# Welcome

**Brevo template ID:** 4  
**Trigger:** a new account is created on Campus Flow

## Params

| Param | Description |
|-------|-------------|
| `params.appUrl` | URL to the Campus Flow app login page |

---

## Subject

```
Bienvenue sur Campus Flow
```

## Body

```
Bonjour,

Votre compte Campus Flow a été créé. Vous pouvez vous connecter dès maintenant :

[Se connecter]({{{ params.appUrl }}})

Si vous n'attendiez pas ce message, ignorez cet email.

L'administration du campus
```
