const GPX_COLORS = ['blue', 'red', 'magenta', 'lime', 'gold']

// Nivells 0-5
var cims = [
	{
		name: 'Puigmal',
		height: 2914,
		lat: 42.383333,
		lon: 2.116667,
		zona_allaus_cat: 7, // Ter
		routes: [
			{
				origin: 'Err',
				description: '',
				level: 2,
				links: [
					'https://www.engarrista.com/node/941',
				],
				gpx: [
					'gpx/puigmal/puigmal.gpx'
				]
			}
		]
	},
	{
		name: 'Pic de la Coma de Varilles',
		height: 2760,
		lat: 42.619142634773816,
		lon: 1.6642544745809575,
		routes: [
			{
				origin: 'Vall de Ransol',
				description: '',
				level: 3,
				links: [
					'https://es.wikiloc.com/rutas-esqui-de-montana/pic-de-coma-de-varilles-16258454/',
					'https://www.engarrista.com/node/781',
				],
				gpx: [
					'gpx/coma-varilles/coma-varilles.gpx'
				]
			}
		]
	},
	{
		name: 'Puigmal de Llo',
		height: 2801,
		lat: 42.39656194347737,
		lon:  2.104725770147957,
		zona_allaus_cat: undefined,
		routes: [
			{
				origin: 'Err',
				description: '',
				level: 2,
				links: [
					'https://www.engarrista.com/node/937',
				],
				gpx: [
					'gpx/puigmal_llo/puigmal_llo.gpx'
				]
			}
		]
		
	},
	{
		name: 'Cambra d\'Ase',
		height: 2750,
		lat: 42.4508,
		lon: 2.1317,
		zona_allaus_cat: undefined,
		routes: [
			{
				origin: 'Eina',
				description: '',
				level: 3,
				links: [
					'https://www.engarrista.com/node/594',
				],
				gpx: [
					'gpx/cambre-dase/cambre-dase.gpx'
				]
			},
			{
				origin: '',
				description: 'Ascens o descens per la canal Central (+250m, max 45º)',
				level: 4,
				links: [
					'https://es.wikiloc.com/rutas-alpinismo/canal-central-del-circ-de-cambre-daze-45144568',
					'https://reptesmuntanyencs.cat/es/cambra-dase-2/',
				],
				gpx: [
					'gpx/cambre-dase/canal-central.gpx'
				]
			}
		]
	},
	{
		name: 'Bastiments',
		height: 2881,
		lat: 42.42682,
		lon: 2.2307,
		zona_allaus_cat: 7, // Ter
		routes: [
			{
				origin: 'Vallter 2000 (parking inferior)',
				description: 'Pel coll de la Marrana',
				level: 2,
				links: [
					'https://www.engarrista.com/node/862',
					'https://tocandoelcielosite.wordpress.com/2020/12/15/bastiments-2-881-m-desde-el-parking-inferior-de-vallter-2000-f/',
				],
				gpx: [
					'gpx/bastiments/bastiments-marrana.gpx'
				] 
			},
			{
				origin: 'Vallter 2000 (parking superior)',
				description: 'Per l\'Esquena de l\'Ase',
				level: 2,
				links: [
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/pic-de-bastiments-circular-per-lesquena-dase-21-12-2014-8487446',
				],
				gpx: [
					'gpx/bastiments/bastiments-esquena-ase.gpx'
				] 
			}
		]
	},
	{
		name: 'Tossa d\'Alp',
		height: 2535,
		lat: 42.320655029481635,
		lon: 1.892931815724428,
		zona_allaus_cat: 5, // Cadí
		routes: [
			{
				origin: 'Masella',
				description: '',
				level: 1,
				links: [
					'https://www.engarrista.com/node/848',
				]
			}
		]
	},
	{
		name: 'Puigpedrós',
		height: 2915,
		lat: 42.48757144193554,
		lon: 1.7619001301144932,
		zona_allaus_cat: 4, // Perafita
		routes: [
			{
				origin: 'Malniu',
				description: '',
				level: 2,
				links: [
					'https://www.engarrista.com/node/867',
				],
				gpx: [
					'gpx/puigpedros/puigpedros.gpx'
				]
			}
		]
	},
	{
		name: 'Pic de la Mina',
		height: 2683,
		lat: 42.535035528153024,
		lon: 1.7687270519581695,
		zona_allaus_cat: undefined,
		routes: [
			{
				origin: 'Estació Porté-Puymorens',
				description: 'Pujada i baixada per l\'estació d\'esquí. Itinerari d\'iniciació.',
				level: 1,
				links: [
					'https://www.engarrista.com/node/692',
				],
				gpx: [
					'gpx/mina/mina.gpx',
				]
			},
			{
				origin: 'Estació Porté-Puymorens',
				description: 'Ascensió per la cresta sud. Senzilla però una mica aèrea en algun punt. Moltes possibilitats de baixada (canals).',
				level: 2,
				links: [
					'https://es.wikiloc.com/rutas-esqui-de-montana/la-mina-per-la-cresta-sud-des-de-porte-5963347',
				],
				gpx: [
					'gpx/mina/cresta-sud.gpx',
				]
			}
		]
	},
	{
		name: 'Tossa Plana de Lles',
		height: 2905,
		lat: 42.468089636744516,
		lon: 1.6568865082073434,
		zona_allaus_cat: 4, // Perafita
		routes: [
			{
				origin: 'Refugi Cap del Rec (Lles)',
				description: '',
				level: 2,
				links: [
					'https://www.engarrista.com/node/695',
					'https://www.esquidetravesia.net/rutas/pirineos/andorra-carlit-puigerda/tossa-plana-de-lles-pic-de-la-portelleta-desde-lles/5-36-138/'
				],
				gpx: [
					'gpx/tossa-plana-de-lles/tossa-plana-de-lles.gpx'
				]
			}
		]
	},
	{
		name: 'Monturull',
		height: 2760,
		lat: 42.44935247901381,
		lon: 1.5786056860818631,
		zona_allaus_cat: 4, // Perafita
		routes: [
			{
				origin: 'Estació d\'esquí Aransa',
				description: '',
				level: 2,
				links: [
					'https://es.wikiloc.com/rutas-esqui-de-montana/monturull-con-esquis-6030339',
					'https://www.panxing.net/turisme-actiu/muntanya-esquis-monturull-2761/'
				],
				gpx: [
					'gpx/monturull/monturull.gpx'
				]
			}
		]
	},
	{
		name: 'Petit Peric',
		height: 2690,
		lat: 42.61434035638892,
		lon: 1.9945887720124558,
		routes: [
			{
				origin: 'Estació Formigueres',
				description: '',
				level: 2,
				links: [
					'https://www.engarrista.com/node/694',
				],
				gpx: [
					'gpx/petit_peric/petit_peric.gpx'
				]
			},
			{
				origin: 'Les Angles',
				description: 'Possible tornada passant pel Mont Llaret',
				level: 2,
				links: [
					'https://es.wikiloc.com/rutas-esqui-de-montana/petit-peric-2-690-m-desde-les-angles-6451552',
					'https://vepderma.wordpress.com/2012/12/09/esqui-de-muntanya-petit-peric-i-mont-llaret-desde-les-angles/',
					'https://fatmap.com/routeid/1227504/skimo-el-petit-peric/',

				],
				gpx: [
					'gpx/petit_peric/petit_peric_les_angles.gpx'
				]
			},
		]
	},
	{
		name: 'Montmalús',
		height: 2781,
		lat: 42.50887928796317,
		lon: 1.6869530470475793,
		routes: [
			{
				origin: 'Grau Roig',
				description: '',
				level: 2,
				links: [
					'https://es.wikiloc.com/rutas-esqui-de-montana/montmalus-9041933',
					'https://relleus.cat/pic-del-montmalus/',
					'https://visitandorra.com/ca/esqui/skimo-pic-de-montmalus/'
				],
				gpx: [
					'gpx/montmalus/montmalus.gpx'
				]
			}
		]
	},
	{
		name: 'Pic dels Pedrons',
		height: 2715,
		lat: 42.531466123101175,
		lon: 1.751993392258683,
		routes: [
			{
				origin: 'Carretera Pas de la Casa',
				description: '',
				level: 2,
				links: [
					'https://www.engarrista.com/node/940'
				],
				gpx: [
					'gpx/pedrons/pedrons.gpx'
				]
			}
		]
	},
	{
		name: 'Pic de Nerassol',
		height: 2633,
		lat: 42.60104368923442,
		lon: 1.7636634654352563,
		routes: [
			{
				origin: 'L\'Hospitalet-près-l\'Andorre',
				description: '',
				level: 3,
				links: [
					'https://es.wikiloc.com/rutas-esqui-de-montana/pic-de-nerassol-ariege-6191525',
					'http://josepmariamoya.blogspot.com/2019/02/circular-al-nerassol-2633-mts.html'
				],
				gpx: [
					'gpx/nerassol/nerassol.gpx'
				]
			}
		]
	},
	{
		name: 'Puig de Coma d\'Or',
		height: 2826,
		lat: 42.58322,
		lon: 1.87387,
		routes: [
			{
				origin: 'Coll de Pimorent',
				description: '',
				level: 2,
				links: [
					'https://es.wikiloc.com/rutas-esqui-de-montana/pico-de-coma-dor-desde-el-col-de-puymorens-con-esquis-6204496',
				],
				gpx: [
					'gpx/coma_dor/coma_dor.gpx'
				]
			}
		]
	},
	{
		name: 'Pic de Mortiers',
		height: 2605,
		lat: 42.63749198645552,
		lon: 1.9856606441835332,
		routes: [
			{
				origin: 'Estació Formigueres',
				description: '',
				level: 3,
				links: [
					'https://esquimontseny.blogspot.com/2018/01/pic-de-mortiers-per-formigueres.html',
					'http://josepmariamoya.blogspot.com/2016/01/formigueres-1740-mts-pic-de-mortiers.html',
					'https://es.wikiloc.com/rutas-esqui-de-montana/mortiers-ski-de-muntanya-12766244'
				],
				gpx: [
					'gpx/mortiers/mortiers.gpx'
				]
			},
			{
				origin: 'Estació Formigueres',
				description: 'Pujada o baixada per la vall de Galba. És aconsellable fer la vall de baixada.',
				level: 3,
				links: [
					'https://es.wikiloc.com/rutas-esqui-de-montana/mortiers-ski-de-muntanya-12766244'
				],
				gpx: [
					'gpx/mortiers/vall-de-galba.gpx'
				]
			}
		]
	},
	{
		name: 'Pic de la Portella Gran',
		height: 2765,
		lat: 42.621530276350164,
		lon: 1.9765146102508881,
		routes: [
			{
				origin: 'Estació Formigueres',
				description: 'Possiblitat d\'agafat forfait de randonée a Formigueres (8€). Possibilitat de baixar per la Vall de Galba.',
				level: 3,
				links: [
					'https://www.wikiloc.com/back-country-skiing-trails/pic-de-la-portella-gran-des-de-formigueres-33982952',
					'https://www.esportselcim.com/blog/puig-de-la-portella-gran-formigueres/',
					'https://www.wikiloc.com/back-country-skiing-trails/puig-de-la-portella-gran-12752087',
				],
				gpx: [
					'gpx/portella-gran/portella-gran.gpx'
				]
			}
		]
	},
	{
		name: 'Puig de la Cometa',
		height: 2763,
		lat: 42.61732187763118,
		lon: 1.9592436044695207,
		routes: [
			{
				origin: 'Estació Les Angles',
				description: 'Possibilitat de tornar per Mont Llaret',
				level: 3,
				links: [
					'https://www.wikiloc.com/back-country-skiing-trails/puig-de-la-cometa-els-angles-33272801',
					'http://esquimontseny.blogspot.com/2016/01/puig-de-la-cometa-per-les-angles.html',
					'http://relatsdemuntanya.blogspot.com/2013/03/pic-de-la-cometa-mont-llaret-i-roc-dauda.html'
				],
				gpx: [
					'gpx/puig-cometa/puig-cometa.gpx'
				]
			}
		]
	},
	{
		name: 'Pic de la Cabaneta',
		height: 2818,
		lat: 42.5886,
		lon: 1.7337,
		routes: [
			{
				origin: 'Pont de la Baladosa (vall d\'Incles)',
				description: '',
				level: 2,
				links: [
					'https://www.engarrista.com/node/423',
					'https://es.wikiloc.com/rutas-esqui-de-montana/pic-de-la-cabaneta-9705681'
				],
				gpx: [
					'gpx/cabaneta/cabaneta.gpx'
				]
			}
		]
	},
	{
		name: 'Pic del Salt',
		height: 2743,
		lat: 42.6328,
		lon: 1.5938,
		routes: [
			{
				origin: 'Aparcament de Sorteny',
				description: '',
				level: 3,
				links: [
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/pic-del-salt-andorra-4284774'
				],
				gpx: [
					'gpx/pic-del-salt/pic-del-salt.gpx'
				]
			}
		]
	},
	{
		name: 'Coma del Forn',
		height: 2683,
		lat: 42.67788,
		lon: 1.19019,
		zona_allaus_cat: 3, // Pallaresa
		routes: [
			{
				origin: 'Estació Tavascan',
				description: '',
				level: 3,
				links: [
					'https://tavascan.net/wp-content/uploads/1-Coma-del-Forn.pdf',
					'https://tavascan.net/wp-content/uploads/1A-Coma-del-Forn-pel-barranc.pdf',
					'https://es.wikiloc.com/rutas-esqui-de-montana/pic-de-la-coma-del-forn-2-685-m-46928554'
				],
				gpx: [
					'gpx/coma-del-forn/coma-del-forn.gpx'
				]
			}
		]
	},
	{
		name: 'Campirme',
		height: 2633,
		lat: 42.65951,
		lon: 1.19365,
		zona_allaus_cat: 3, // Pallaresa
		routes: [
			{
				origin: 'Estació Tavascan',
				description: '',
				level: 3,
				links: [
					'https://tavascan.net/wp-content/uploads/2-Campirme.pdf',
					'https://es.wikiloc.com/rutas-esqui-de-montana/campirme-2-633-m-desde-el-refugio-de-la-pleta-del-prat-23308792'
				],
				gpx: [
					'gpx/campirme/campirme.gpx'
				]
			}
		]
	},
	{
		name: 'Tuc de la Cima',
		height: 2456,
		lat: 42.6640,
		lon: 1.2139,
		zona_allaus_cat: 3, // Pallaresa
		routes: [
			{
				origin: 'Estació Tavascan',
				description: '',
				level: 3,
				links: [
					'https://tavascan.net/wp-content/uploads/3-Tuc-de-la-Cima.pdf',
				],
				gpx: [
					'gpx/tuc-de-la-cima/tuc-de-la-cima.gpx'
				]
			}
		]
	},
	{
		name: 'Pic de Certascan',
		height: 2853,
		lat: 42.71200,
		lon: 1.27766,
		zona_allaus_cat: 1, // Aran
		routes: [
			{
				origin: 'Bordes de Quanca',
				description: '<p>Possible tornada pel Flamisella</p><p>Possible anar fins al refugi de Certascan a fer nit, si és obert</p>',
				level: 5,
				links: [
					'https://es.wikiloc.com/rutas-esqui-de-montana/certascan-per-noarre-i-retorn-per-estany-de-flamisella-24541884',
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/pic-de-certascan-i-pic-de-flamisella-23013986',
					'https://es.wikiloc.com/rutas-esqui-de-montana/pic-certascan-refugi-pic-flamisella-4075368',
				],
				gpx: [
					'gpx/certascan/certascan-quanca.gpx'
				]
			},
			{
				origin: 'Presa de Montalto',
				description: '<p>Possible dormir al refugi de Certascan si és obert</p>',
				level: 5,
				links: [
					'https://es.wikiloc.com/rutas-esqui-de-montana/pic-de-certascan-pel-refugi-1591451',
				],
				gpx: [
					'gpx/certascan/certascan-montalto.gpx'
				]
			},
		]
	},
	{
		name: 'Tuc de Bacivèr',
		height: 2645,
		lat: 42.71263,
		lon: 0.99163,
		zona_allaus_cat: 1, // Aran
		routes: [
			{
				origin: 'Aparcament de l\'Orri (Beret)',
				description: '',
				level: 4,
				links: [
					'https://www.engarrista.com/node/777',
					'https://es.wikiloc.com/rutas-esqui-de-montana/val-daran-tuc-de-vaciver-o-baciver-i-pic-de-rosari-34338400',
					'https://es.wikiloc.com/rutas-esqui-de-montana/tuc-de-baciver-16848877'
				],
				gpx: [
					'gpx/baciver/baciver.gpx'
				]
			},
		]
	},

	{
		name: 'Gran Tuc de Colomers',
		height: 2933,
		lat: 42.589401425615314,
		lon: 0.9378738447900908,
		zona_allaus_cat: 2, // Ribagorça
		routes: [
			{
				origin: 'Banhs de Tredòs',
				description: '',
				level: 4,
				links: [
					'https://www.esquidetravesia.net/rutas/pirineos/valh-de-aran-bonaigua-montgarri/gran-tuc-de-colomers-por-el-circ-de-colomers/5-34-124/',
					'https://es.wikiloc.com/rutas-esqui-de-montana/gran-tuc-de-colomers-per-colomers-10219820'
				],
				gpx: [
					'gpx/gran-tuc-de-colomers/gran-tuc-de-colomers.gpx'
				]
			}
		]
	},
	{
		name: 'Tuc de Beret',
		height: 2594,
		lat: 42.72324317013702,
		lon: 1.00460945566851,
		zona_allaus_cat: 1, // Aran
		routes: [
			{
				origin: 'Pla de Beret',
				description: '',
				level: 3,
				links: [
					'https://es.wikiloc.com/rutas-esqui-de-montana/tuc-de-beret-24455408',
				],
				gpx: [
					'gpx/tuc-beret/tuc-beret.gpx'
				]
			},
			{
				origin: 'Pla de Beret',
				description: 'Volta per la Cabana de Marimanha i el Tuc deth Dossau',
				level: 4,
				links: [
					'https://es.wikiloc.com/rutas-esqui-de-montana/beret-tuc-de-beret-cabana-marimanha-portillo-marimanha-tuc-dossau-beret-47042486',
				],
				gpx: [
					'gpx/tuc-beret/tuc-beret-marimanha.gpx'
				]
			},
		]
	},
	{
		name: 'Cap des Closos',
		height: 2418,
		lat: 42.747217782282,
		lon: 0.9309402597333646,
		zona_allaus_cat: 1, // Aran
		routes: [
			{
				origin: 'Pla de Beret',
				description: '',
				level: 2,
				links: [
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/cap-de-closos-16350351',
					'https://es.wikiloc.com/rutas-esqui-de-montana/circular-al-cap-des-closos-2-416-m-desde-pla-de-beret-pasando-por-tuc-deth-miei-y-tuc-de-costarjas-38961815'
				],
				gpx: [
					'gpx/cap-des-closos/cap-des-closos.gpx'
				]
			},
		]
	},
	{
		name: 'Cap de la Gallina Pelada',
		height: 2322,
		lat: 42.18947332291835,
		lon: 1.7381207097237839,
		zona_allaus_cat: 6, // Prepirineu
		routes: [
			{
				origin: 'Parc d\'aventura Palomera',
				description: '',
				level: 2,
				links: [
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/cap-de-la-gallina-pelada-16943856',
				],
				gpx: [
					'gpx/gallina-pelada/gallina-pelada.gpx'
				]
			},
		]
	},
	{
		name: 'Pic d\'Envalira',
		height: 2816,
		lat: 42.51845,
		lon: 1.72248,
		routes: [
			{
				origin: 'Pas de la Casa',
				description: '',
				level: 3,
				links: [
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/pas-de-la-casa-pic-negre-denvalira-pic-denvalira-pas-de-la-casa-12746449',
				],
				gpx: [
					'gpx/pic-denvalira/pic-denvalira.gpx'
				]
			},
		]
	},
	{
		name: 'Besiberri sud',
		height: 3030,
		lat: 42.59374599913921,
		lon:  0.8259771822107392,
		zona_allaus_cat: 2, // Ribagorça
		routes: [
			{
				origin: 'Presa Cavallers',
				description: '',
				level: 5,
				links: [
					'https://tocandoelcielosite.wordpress.com/2021/04/04/besiberri-sur-3-030-m-desde-el-embalse-de-cavallers-pd/',
				],
				gpx: [
					'gpx/besiberri-sud/besiberri-sud-1.gpx'
				]
			},
			{
				origin: 'Refugi de Conangles',
				description: 'És possible dormir al <a href="https://www.feec.cat/fem-muntanya/refugis/refugi/refugi-besiberri/" target="_blank">refugi de Besiberri</a>',
				level: 5,
				links: [
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/besiberri-nord-i-sud-330454',
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/bessiberri-sud-des-de-refugi-de-bessiberri-97677599'
				],
				gpx: [
					'gpx/besiberri-sud/besiberri-sud-2.gpx'
				]
			},

		]
	},
	{
		name: 'Cap del Port',
		height: 2750,
		lat: 42.58064187941781,
		lon:  1.710939619224519,
		routes: [
			{
				origin: 'Vall d\'Incles',
				description: '',
				level: 3,
				links: [
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/pic-cap-del-port-2-750m-34813264',
				],
				gpx: [
					'gpx/cap-del-port/cap-del-port.gpx'
				]
			},
		]
	},
	{
		name: 'Bac d\'Ortella',
		height: 2722,
		lat: 42.54156242687387,
		lon: 1.906399838626385,
		routes: [
			{
				origin: 'Bena',
				description: '',
				level: 3,
				links: [
					'http://cegesqui.blogspot.com/2018/03/bac-d-ortella-2722m.html',
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/bac-dortella-2-722m-32878307',
				],
				gpx: [
					'gpx/bac-dortella/bac-dortella.gpx'
				]
			},
		]
	},
	{
		name: 'Tarbessou',
		height: 2364,
		lat: 42.7138614914681,
		lon: 1.970713644041098,
		routes: [
			{
				origin: 'Mijanès',
				description: '',
				level: 3,
				links: [
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/estacio-esqui-mijanes-tarbesou-12794611',
				],
				gpx: [
					'gpx/tarbessou/tarbessou.gpx'
				]
			},
		]
	},
	{
		name: 'Tossa de Pé d\'Orrés',
		height: 2468,
		lat: 42.61807,
		lon: 1.78055,
		routes: [
			{
				origin: 'L\'Hospitalet-près-l\'Andorre',
				description: '',
				level: 3,
				links: [
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/tose-de-pedourres-2468m-25-01-2009-281465',
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/tossa-de-pe-dorres-2-458-m-5817170'
				],
				gpx: [
					'gpx/tosse-pedourres/tosse-pedourres.gpx'
				]
			},
		]
	},
	{
		name: 'Pic de l\'Alba',
		height: 2764,
		lat: 42.61531,
		lon: 1.75221,
		routes: [
			{
				origin: 'L\'Hospitalet-près-l\'Andorre',
				description: '',
				level: 3,
				links: [
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/pic-dalbe-2-764-m-ariege-con-esquis-9343331',
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/el-pic-dalbe-circular-des-de-lhospitalet-96530794'
				],
				gpx: [
					'gpx/pic-de-lalba/pic-de-lalba-ascens.gpx'
				]
			},
			{
				origin: 'L\'Hospitalet-près-l\'Andorre',
				description: 'Possible descens per la vall de Siscar',
				level: 3,
				links: [
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/pic-dalbe-2-764-m-ariege-con-esquis-9343331',
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/el-pic-dalbe-circular-des-de-lhospitalet-96530794'
				],
				gpx: [
					'gpx/pic-de-lalba/pic-de-lalba-descens.gpx'
				]
			},
		]
	},
	{
		name: 'Pic d\'Anrodat',
		height: 2730,
		lat: 42.62489,
		lon: 1.68264,
		routes: [
			{
				origin: 'Vall d\'Incles',
				description: '',
				level: 4,
				links: [
					'https://www.wikiloc.com/back-country-skiing-trails/pic-danrodat-coume-denfer-canillo-andorra-66356111',
				],
				gpx: [
					'gpx/anrodat/anrodat.gpx'
				]
			},
		]
	},
	{
		name: 'Tuc de Portavera',
		height: 2256,
		lat: 42.742574277088536,
		lon: 1.1311867833137514,
		zona_allaus_cat: 1, // Aran
		routes: [
			{
				origin: 'Refugi del Fornet',
				description: 'Zona molt propensa a allaus, molta precaució.',
				level: 5,
				links: [
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/port-de-salau-i-tuc-de-portavera-93359304',
				],
				gpx: [
					'gpx/portavera/portavera.gpx'
				]
			},
		]
	},
	{
		name: 'Pic de Montalt',
		height: 2495,
		lat: 42.7503133048166,
		lon: 1.132747828960419,
		zona_allaus_cat: 1, // Aran
		routes: [
			{
				origin: 'Refugi del Fornet',
				description: 'Zona molt propensa a allaus, molta precaució.',
				level: 5,
				links: [
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/pic-de-montaut-o-montalt-94306935',
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/pic-de-montaud-63685853',
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/montalt-per-laresta-sur-93044613'
				],
				gpx: [
					'gpx/montaut/montaut.gpx'
				]
			},
		]
	},
	{
		name: 'Pic de Moredo',
		height: 2776,
		lat: 42.71817692020513,
		lon: 1.0508412122726443,
		zona_allaus_cat: 1, // Aran
		routes: [
			{
				origin: 'Bordes de Moredo',
				description: 'Per accedir a l\'inici amb cotxe es necessita un 4x4, o bé es pot començar a peu o en bicicleta des de més a baix.',
				level: 4,
				links: [
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/pic-de-moredo-2766m-4447710',
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/2014-03-15-08-23-pic-moredo-9626470'
				],
				gpx: [
					'gpx/moredo/moredo.gpx'
				]
			},
		]
	},
	{
		name: 'Pic de Miques',
		height: 2489,
		lat: 42.72777702538729,
		lon: 1.0727763175964358,
		zona_allaus_cat: 1, // Aran
		routes: [
			{
				origin: 'Bordes de Moredo',
				description: 'Zona amb presència d\'ossos, cal anar amb precaució. Per arribar al cim cal superar una cresta, és possible quedar-se a l\'avantcim.',
				level: 4,
				links: [
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/pic-des-miques-34502390',
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/pic-des-miques-34543287'
				],
				gpx: [
					'gpx/miques/miques.gpx'
				]
			},
		]
	},
	{
		name: 'Tuc der Òme',
		height: 2732,
		lat: 42.78886,
		lon: 0.93514,
		zona_allaus_cat: 1, // Aran
		routes: [
			{
				origin: 'Pla de Beret',
				description: '',
				level: 4,
				links: [
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/tuc-der-ome-93644618',
				],
				gpx: [
					'gpx/tuc-der-ome/tuc-der-ome.gpx'
				]
			},
		]
	},
	{
		name: 'Comapedrosa',
		height: 2943,
		lat: 42.59181202446238,
		lon: 1.4436639843458605,
		routes: [
			{
				origin: 'Arinsal',
				description: 'Pujada pel refugi del Pla de l\'Estany',
				level: 4,
				links: [
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/comapedrosa-pel-refugi-del-pla-de-l-estany-i-baixada-per-la-canal-de-lalt-17153747',
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/circular-al-comapedrosa-i-baixant-per-la-canal-del-canut-o-de-lalt-33795698',
				],
				gpx: [
					'gpx/comapedrosa/pla-estany.gpx'
				]
			},
			{
				origin: 'Arinsal',
				description: 'Pujada pel refugi del Comapedrosa',
				level: 4,
				links: [
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/pic-de-comapedrosa-per-refugi-de-les-truites-i-descens-de-la-canal-de-lalt-andorra-6199682',
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/comapedrosa-6663953',
				],
				gpx: [
					'gpx/comapedrosa/refu-comapedrosa.gpx'
				]
			},
			{
				origin: 'Comapedrosa',
				description: 'Baixada per la canal de l\'Alt (o del Canut). Trams de més de 40º, perillós amb mala neu.',
				level: 4,
				links: [
					'https://ca.wikiloc.com/rutes-esqui-de-muntanya/comapedrosa-pel-refugi-del-pla-de-l-estany-i-baixada-per-la-canal-de-lalt-17153747',
				],
				gpx: [
					'gpx/comapedrosa/canal-alt.gpx'
				]
			},
		]
	},
];