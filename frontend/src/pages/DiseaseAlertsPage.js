import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { ShieldAlert, Send, Building2, User } from 'lucide-react';
import './DiseaseAlertsPage.css';

// Fix Leaflet's default icon issue with React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons for Map
const farmIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const vetIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const dangerIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const warningIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

function DiseaseAlertsPage() {
    const { t } = useTranslation();
    const { currentFarm } = useSelector((state) => state.farm);
    const [isOutbreakActive, setIsOutbreakActive] = useState(false);
    const [dispatchLogs, setDispatchLogs] = useState([]);
    
    // Default to Center of India until geolocation resolves
    const [centerPos, setCenterPos] = useState([20.5937, 78.9629]); 
    const [mockData, setMockData] = useState({ vets: [], neighbors: [] });

    // Dynamically geocode the user's farm location
    useEffect(() => {
        const fetchLocation = async () => {
            if (currentFarm?.location) {
                try {
                    const query = `${currentFarm.location.district || ''}, ${currentFarm.location.state || ''}, India`;
                    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`);
                    const data = await res.json();
                    
                    if (data && data.length > 0) {
                        const lat = parseFloat(data[0].lat);
                        const lon = parseFloat(data[0].lon);
                        setCenterPos([lat, lon]);
                        
                        // Procedurally generate mock vets and neighbors precisely around the user's real city
                        setMockData({
                            vets: [
                                { id: 101, name: "Dr. Sharma Vet Clinic", pos: [lat + 0.015, lon + 0.005], phone: "+91 9876543210" },
                                { id: 102, name: "City Animal Hospital", pos: [lat - 0.010, lon - 0.015], phone: "+91 9876543211" },
                                { id: 103, name: "Green Valley Vet Services", pos: [lat + 0.025, lon + 0.020], phone: "+91 9876543212" }
                            ],
                            neighbors: [
                                { id: 201, name: "Singh Dairy", pos: [lat + 0.005, lon + 0.008] },
                                { id: 202, name: "Sunrise Livestock", pos: [lat - 0.006, lon - 0.005] },
                                { id: 203, name: "Kisan Farm", pos: [lat + 0.030, lon - 0.025] } // Outside 4km radius
                            ]
                        });
                    }
                } catch (error) {
                    console.error("Geocoding failed:", error);
                }
            }
        };
        fetchLocation();
    }, [currentFarm]);

    const myFarm = { id: 1, name: currentFarm?.farmName || "My Farm", pos: centerPos, type: 'mine' };

    const simulateOutbreak = () => {
        setIsOutbreakActive(true);
        setDispatchLogs([]);

        // Simulate dispatching alerts with realistic delays
        const logs = [
            "[CRITICAL] Foot and Mouth Disease (FMD) verified at Rajput Cattle Farm.",
            "Establishing 5km quarantine geofence...",
            "[SMS SENT] Alerting Dr. Sharma Vet Clinic (1.5km) - High Priority Assistance Required.",
            "[SYSTEM ALERT] Singh Dairy Farm marked as AT RISK. Biosecurity warnings dispatched.",
            "[SYSTEM ALERT] Sunrise Livestock marked as AT RISK. Quarantine protocols initiated.",
            "[EMAIL SENT] Notifying City Animal Hospital of regional outbreak status."
        ];

        logs.forEach((log, index) => {
            setTimeout(() => {
                setDispatchLogs(prev => [...prev, log]);
            }, index * 1200);
        });
    };

    const resolveOutbreak = () => {
        setIsOutbreakActive(false);
        setDispatchLogs([]);
    };

    return (
        <div className="map-page-container">
            <div className="map-header">
                <div className="map-header-text">
                    <h2>Live Disease GIS Map</h2>
                    <p>Monitor regional outbreaks, veterinary clinics, and biosecurity geofences in real-time.</p>
                </div>
                {!isOutbreakActive ? (
                    <button className="btn-simulate-outbreak" onClick={simulateOutbreak}>
                        <ShieldAlert size={18} /> Simulate Outbreak Detection
                    </button>
                ) : (
                    <button className="btn-resolve-outbreak" onClick={resolveOutbreak}>
                        Resolve Outbreak
                    </button>
                )}
            </div>

            <div className="map-layout">
                <div className="map-wrapper">
                    <MapContainer center={centerPos} zoom={13} style={{ height: '100%', width: '100%', borderRadius: '12px' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        
                        {/* My Farm */}
                        <Marker position={myFarm.pos} icon={isOutbreakActive ? dangerIcon : farmIcon}>
                            <Popup>
                                <strong>{myFarm.name}</strong><br/>
                                {isOutbreakActive ? <span className="text-danger">Status: OUTBREAK DETECTED (FMD)</span> : <span className="text-success">Status: Healthy</span>}
                            </Popup>
                        </Marker>

                        {/* Quarantine Radius */}
                        {isOutbreakActive && (
                            <Circle 
                                center={myFarm.pos} 
                                radius={4000} // 4km radius
                                pathOptions={{ color: 'red', fillColor: '#ef4444', fillOpacity: 0.2 }}
                            />
                        )}

                        {/* Nearby Vets */}
                        {mockData.vets.map(vet => (
                            <Marker key={vet.id} position={vet.pos} icon={vetIcon}>
                                <Popup>
                                    <strong>{vet.name}</strong><br/>
                                    <Building2 size={14} className="inline-icon"/> Vet Clinic<br/>
                                    📞 {vet.phone}
                                </Popup>
                            </Marker>
                        ))}

                        {/* Neighboring Farms */}
                        {mockData.neighbors.map(farm => {
                            // If outbreak is active, farms closer than 4km are at risk
                            const isAtRisk = isOutbreakActive && (farm.id === 201 || farm.id === 202);
                            return (
                                <Marker key={farm.id} position={farm.pos} icon={isAtRisk ? warningIcon : farmIcon}>
                                    <Popup>
                                        <strong>{farm.name}</strong><br/>
                                        <User size={14} className="inline-icon"/> Neighboring Farm<br/>
                                        {isAtRisk ? <span className="text-warning">Status: AT RISK (Inside Quarantine Zone)</span> : <span className="text-success">Status: Safe</span>}
                                    </Popup>
                                </Marker>
                            )
                        })}
                    </MapContainer>
                </div>

                <div className="dispatch-panel">
                    <h3><Send size={20} /> Automated Dispatch Log</h3>
                    <div className="log-container">
                        {dispatchLogs.length === 0 && !isOutbreakActive && (
                            <div className="empty-log">System Normal. No active geofences.</div>
                        )}
                        {dispatchLogs.map((log, index) => (
                            <div key={index} className={`log-entry ${log.includes('[CRITICAL]') ? 'log-critical' : ''} ${log.includes('[SYSTEM ALERT]') ? 'log-warning' : ''}`}>
                                <span className="log-time">{new Date().toLocaleTimeString()}</span>
                                <span className="log-message">{log}</span>
                            </div>
                        ))}
                        {isOutbreakActive && dispatchLogs.length < 6 && (
                            <div className="typing-indicator">
                                <span></span><span></span><span></span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DiseaseAlertsPage;
