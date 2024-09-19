import React, { useEffect, useState } from 'react';

// Example array of future timestamps (in milliseconds)
const futureTimestamps = [
    Date.now() + 50000, // 5 seconds from now
    Date.now() + 10000, // 10 seconds from now
    Date.now() + 15000, // 15 seconds from now
];

const TimeAlert = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        // Loop through each timestamp and schedule a timeout for the alert
        futureTimestamps.forEach((timestamp, index) => {
            const delay = timestamp - Date.now(); // Calculate the delay relative to now
            
            if (delay > 0) {
                const timeoutId = setTimeout(() => {
                    alert(`Alert for time: ${new Date(timestamp).toLocaleTimeString()}`);
                    setAlerts((prev) => [...prev, new Date(timestamp).toLocaleTimeString()]); // Store alert
                }, delay);

                // Clear the timeout if the component is unmounted
                return () => clearTimeout(timeoutId);
            }
        });
    }, []); // Run only once when the component mounts

    return (
        <div>
            <h2>Time Alerts</h2>
            <ul>
                {alerts.map((alertTime, index) => (
                    <li key={index}>Alert triggered at: {alertTime}</li>
                ))}
            </ul>
        </div>
    );
};

export default TimeAlert;
