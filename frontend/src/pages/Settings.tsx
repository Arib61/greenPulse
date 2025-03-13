import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Bell, Globe, Lock, User } from 'lucide-react';

export function Settings() {
  const [userData, setUserData] = useState({
    prenom: '',
    nom: '',
    email: '',
    currentPassword: '',
    newPassword: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // États pour les préférences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [language, setLanguage] = useState('Français');

  // ✅ Récupérer l'ID de l'utilisateur connecté depuis localStorage ou un état global
  const userId = localStorage.getItem('userId'); // Assurez-vous que cet ID est stocké lors de l'authentification

  useEffect(() => {
    if (!userId) {
      setError('Utilisateur non authentifié');
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/utilisateurs/${userId}`);
        if (!response.ok) throw new Error('Erreur de chargement des données');
        
        const data = await response.json();
        setUserData((prev) => ({
          ...prev,
          prenom: data.prenom,
          nom: data.nom,
          email: data.email
        }));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const updatePassword = async () => {
    setError('');
    setSuccess('');
  
    if (!userId) {
      setError('Utilisateur non authentifié');
      return;
    }
  
    if (!userData.currentPassword || !userData.newPassword) {
      setError('Veuillez remplir tous les champs de mot de passe.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8080/api/utilisateurs/${userId}/update-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ancienMotDePasse: userData.currentPassword,
          nouveauMotDePasse: userData.newPassword,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Échec de la mise à jour du mot de passe');
      }
  
      setSuccess('Mot de passe mis à jour avec succès');
      setUserData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!userId) {
      setError('Utilisateur non authentifié');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/utilisateurs/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prenom: userData.prenom,
          nom: userData.nom,
          email: userData.email,
          motDePasse: userData.newPassword,
          ancienMotDePasse: userData.currentPassword
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Échec de la mise à jour');
      }

      setSuccess('Profil mis à jour avec succès');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la mise à jour');
    }
  };

  if (loading) return <div className="text-center p-4">Chargement...</div>;

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Paramètres</h1>

      {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-4 mb-4 rounded">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Profil
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Prénom</label>
              <input
                type="text"
                value={userData.prenom}
                onChange={(e) => setUserData({...userData, prenom: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nom</label>
              <input
                type="text"
                value={userData.nom}
                onChange={(e) => setUserData({...userData, nom: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={userData.email}
                onChange={(e) => setUserData({...userData, email: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Sécurité
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Mot de passe actuel</label>
              <input
                type="password"
                value={userData.currentPassword}
                onChange={(e) => setUserData({...userData, currentPassword: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
              <input
                type="password"
                value={userData.newPassword}
                onChange={(e) => setUserData({...userData, newPassword: e.target.value})}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              />
            </div>
            <button
              type="button"
              onClick={updatePassword}
              className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Modifier le mot de passe
            </button>
          </div>
        </div>


        {/* Autres paramètres */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Notifications par email</span>
              <input 
                type="checkbox" 
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="rounded text-green-600"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Langue
          </h2>
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          >
            <option>Français</option>
            <option>English</option>
            <option>العربية</option>
          </select>
        </div>

        <button 
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
        >
          Enregistrer les modifications
        </button>
      </form>
    </DashboardLayout>
  );
}
