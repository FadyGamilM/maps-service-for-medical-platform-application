import React, { useEffect, useState } from "react";
import { Map, Marker, ZoomControl, GeoJson } from "pigeon-maps";

//! This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) {
	var R = 6371; // km
	var dLat = toRad(lat2 - lat1);
	var dLon = toRad(lon2 - lon1);
	var lat1 = toRad(lat1);
	var lat2 = toRad(lat2);

	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	return d;
}

//! Converts numeric degrees to radians
function toRad(Value) {
	return (Value * Math.PI) / 180;
}

//! the map component
const MyReactApp = () => {
	//! array of objects contains all places around us
	// const [spaces, setSpaces] = useState([
	// 	{ latitude: 30.116324, longitude: 31.337531 },
	// 	{ latitude: 30.115579, longitude: 31.338894 },
	// 	{ latitude: 30.115791, longitude: 31.335978 },
	// 	{ latitude: 30.113495, longitude: 31.338033 },
	// 	{ latitude: 30.111172, longitude: 31.340979 },
	// ]);
	let spaces = [
		{ latitude: 30.116324, longitude: 31.337531, name: "مستشفي سان بيتر" },
		{ latitude: 30.115579, longitude: 31.338894, name: "مستشفي التخصصي" },
		{ latitude: 30.115791, longitude: 31.335978, name: "مستشفي جامعة عين شمس" },
		{ latitude: 30.113495, longitude: 31.338033, name: "مستشفي النهضة" },
		{ latitude: 30.111172, longitude: 31.340979, name: "مستشفي النهضة" },
		{ latitude: 30.115494, longitude: 31.348949, name: "مستشفي الزيتون" },
	];
	//! state contains our current location "user location"
	const [mylocation, setMylocation] = useState({});
	const [isShown, setIsShown] = useState({ status: false, name: "" });
	//! to get my location
	useEffect(() => {
		navigator.geolocation.getCurrentPosition(function (position) {
			console.log("Latitude is :", position.coords.latitude);
			console.log("Longitude is :", position.coords.longitude);
			setMylocation({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
		});
	}, []);
	const [hue, setHue] = useState(0);
	const color = `hsl(${hue % 360}deg 39% 70%)`;
	const geoJsonSample = {
		type: "FeatureCollection",
		features: [
			{
				type: "Feature",
				geometry: {
					type: "Point",
					coordinates: [30.148013265529766, 31.328069660871982],
				},
				properties: { prop0: "value0" },
			},
		],
	};
	return (
		<div>
			<div className="h-screen">
				<Map
					// height={700}
					defaultCenter={[30.117165, 31.339126]}
					// zoom={zoom}
					defaultZoom={15}
				>
					<ZoomControl />
					<Marker width={50} color={color} anchor={[30.117165, 31.339126]} />
					{spaces.map((space, index) => {
						return (
							<Marker
								onMouseOver={() =>
									setIsShown({ status: true, name: space.name })
								}
								onMouseOut={() =>
									setIsShown({ status: false, name: space.name })
								}
								key={index}
								width={50}
								anchor={[space.latitude, space.longitude]}
							/>
						);
					})}
				</Map>
			</div>

			<div>
				{isShown.status && (
					<div className="bg-white text-center items-center justify-center pt-4 my-2 rounded-2xl font-bold w-52 h-28 shadow-xl p-2 absolute top-8 right-8">
						<div>{isShown.name}</div>
						<div className="text-blue-600 ">01283233951</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default MyReactApp;
