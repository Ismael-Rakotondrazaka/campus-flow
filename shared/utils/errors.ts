import type { AuthError } from '@supabase/auth-js';

export const authErrorCodeMessageMap: Record<string, string> = {
  anonymous_provider_disabled: 'La connexion anonyme est désactivée.',
  bad_code_verifier:
    'Le vérificateur de code est invalide. Veuillez réessayer.',
  bad_json: 'Le format de la requête est invalide.',
  bad_jwt: 'Votre jeton de session est invalide.',
  bad_oauth_callback: 'Le rappel OAuth est invalide.',
  bad_oauth_state: "L'état OAuth est invalide ou a expiré.",
  captcha_failed: 'La vérification du captcha a échoué. Veuillez réessayer.',
  conflict: 'Cette requête entre en conflit avec des données existantes.',
  email_address_invalid: 'Veuillez saisir une adresse e-mail valide.',
  email_address_not_authorized: "Cette adresse e-mail n'est pas autorisée.",
  email_conflict_identity_not_deletable:
    'Cet e-mail est lié à une identité qui ne peut pas être supprimée.',
  email_exists: 'Un compte avec cet e-mail existe déjà.',
  email_not_confirmed: "Veuillez d'abord confirmer votre adresse e-mail.",
  email_provider_disabled: "L'authentification par e-mail est désactivée.",
  flow_state_expired:
    "Votre session d'authentification a expiré. Veuillez réessayer.",
  flow_state_not_found:
    "Session d'authentification introuvable. Veuillez recommencer.",
  hook_payload_invalid_content_type:
    'Le type de contenu du payload webhook est invalide.',
  hook_payload_over_size_limit: 'Le payload webhook est trop volumineux.',
  hook_timeout: 'Le webhook a expiré. Veuillez réessayer.',
  hook_timeout_after_retry: 'Le webhook a expiré après plusieurs tentatives.',
  identity_already_exists: 'Cette identité est déjà liée à votre compte.',
  identity_not_found: 'Identité introuvable.',
  insufficient_aal:
    "Un niveau d'authentification plus élevé est requis pour cette action.",
  invalid_credentials: 'E-mail ou mot de passe invalide.',
  invite_not_found: 'Cette invitation est invalide ou a expiré.',
  manual_linking_disabled: 'La liaison manuelle de comptes est désactivée.',
  mfa_challenge_expired: 'Le défi MFA a expiré. Veuillez réessayer.',
  mfa_factor_name_conflict: 'Un facteur MFA avec ce nom existe déjà.',
  mfa_factor_not_found: 'Facteur MFA introuvable.',
  mfa_ip_address_mismatch:
    'La vérification MFA doit être effectuée depuis la même adresse IP.',
  mfa_phone_enroll_not_enabled:
    "L'inscription au MFA par téléphone est désactivée.",
  mfa_phone_verify_not_enabled:
    'La vérification MFA par téléphone est désactivée.',
  mfa_totp_enroll_not_enabled:
    "L'inscription au MFA par application est désactivée.",
  mfa_totp_verify_not_enabled:
    'La vérification MFA par application est désactivée.',
  mfa_verification_failed: 'La vérification MFA a échoué. Veuillez réessayer.',
  mfa_verification_rejected: 'La vérification MFA a été rejetée.',
  mfa_verified_factor_exists: 'Un facteur MFA vérifié existe déjà.',
  mfa_webauthn_enroll_not_enabled:
    "L'inscription au MFA par clé de sécurité est désactivée.",
  mfa_webauthn_verify_not_enabled:
    'La vérification MFA par clé de sécurité est désactivée.',
  no_authorization: "Vous n'êtes pas autorisé à effectuer cette action.",
  not_admin: "L'accès administrateur est requis pour cette action.",
  oauth_provider_not_supported:
    "Ce fournisseur OAuth n'est pas pris en charge.",
  otp_disabled: 'La connexion par mot de passe unique est désactivée.',
  otp_expired: 'Le mot de passe unique a expiré.',
  over_email_send_rate_limit:
    'Trop de demandes par e-mail. Veuillez patienter et réessayer.',
  over_request_rate_limit: 'Trop de requêtes. Veuillez patienter et réessayer.',
  over_sms_send_rate_limit:
    'Trop de demandes par SMS. Veuillez patienter et réessayer.',
  phone_exists: 'Un compte avec ce numéro de téléphone existe déjà.',
  phone_not_confirmed: "Veuillez d'abord confirmer votre numéro de téléphone.",
  phone_provider_disabled: "L'authentification par téléphone est désactivée.",
  provider_disabled: "Ce fournisseur d'authentification est désactivé.",
  provider_email_needs_verification:
    'Veuillez vérifier votre e-mail auprès du fournisseur avant de continuer.',
  reauth_nonce_missing: 'Le jeton de réauthentification est manquant.',
  reauthentication_needed: 'Veuillez vous réauthentifier pour continuer.',
  reauthentication_not_valid:
    'La réauthentification a échoué. Veuillez réessayer.',
  refresh_token_already_used: 'Ce jeton de session a déjà été utilisé.',
  refresh_token_not_found:
    'Jeton de session introuvable. Veuillez vous reconnecter.',
  request_timeout: 'La requête a expiré. Veuillez réessayer.',
  same_password: "Votre nouveau mot de passe doit être différent de l'ancien.",
  saml_assertion_no_email: "La réponse SAML n'inclut pas d'e-mail.",
  saml_assertion_no_user_id:
    "La réponse SAML n'inclut pas d'identifiant utilisateur.",
  saml_entity_id_mismatch: "L'identifiant d'entité SAML ne correspond pas.",
  saml_idp_already_exists: "Ce fournisseur d'identité SAML existe déjà.",
  saml_idp_not_found: "Fournisseur d'identité SAML introuvable.",
  saml_metadata_fetch_failed: 'Impossible de récupérer les métadonnées SAML.',
  saml_provider_disabled: "L'authentification SAML est désactivée.",
  saml_relay_state_expired: "L'état de relais SAML a expiré.",
  saml_relay_state_not_found: 'État de relais SAML introuvable.',
  session_expired: 'Votre session a expiré. Veuillez vous reconnecter.',
  session_not_found: 'Session introuvable. Veuillez vous reconnecter.',
  signup_disabled: 'Les nouvelles inscriptions sont actuellement désactivées.',
  single_identity_not_deletable:
    'Vous ne pouvez pas supprimer la seule identité liée à ce compte.',
  sms_send_failed: "L'envoi du SMS a échoué. Veuillez réessayer.",
  sso_domain_already_exists: 'Ce domaine SSO est déjà configuré.',
  sso_provider_not_found: 'Fournisseur SSO introuvable.',
  too_many_enrolled_mfa_factors:
    'Vous avez atteint le nombre maximum de facteurs MFA.',
  unexpected_audience: "L'audience du jeton est invalide.",
  unexpected_failure: "Une erreur s'est produite. Veuillez réessayer.",
  user_already_exists: 'Un compte avec ces informations existe déjà.',
  user_banned: 'Ce compte a été bloqué.',
  user_not_found: 'Compte introuvable.',
  user_sso_managed:
    'Ce compte est géré par SSO et ne peut pas être modifié ici.',
  validation_failed: 'Certaines données fournies sont invalides.',
  weak_password:
    'Votre mot de passe est trop faible. Veuillez en choisir un plus robuste.',
};

export const getAuthErrorMessage = (error: AuthError): string => {
  if (error.code) {
    return authErrorCodeMessageMap[error.code] || error.message;
  }

  return error.message;
};
