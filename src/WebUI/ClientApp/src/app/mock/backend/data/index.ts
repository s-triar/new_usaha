////import { DataMyShopListItem, ProductListItemInfo, WorkspaceLink } from '../interfaces';
////import { EnterpriseTypeDto, GoodsPackagingDto, GoodsTypeDto, MyEnterpriseDto, MyGoodsesListItemDto, MyGoodsForCashierDto } from '../types/Dtos';

import { BUSINESS_DEFAULT } from "../../../application/constant";
import { EnterpriseTypeDto, MyEnterpriseDto, MyGoodsForCashierDto } from "../../../domain/backend/Dtos";

////import { BUSINESS_DEFAULT } from '../values';
export const enterpriseTypes: EnterpriseTypeDto[] = [
    {
        id: 1,
        name: 'Toko',
        provide: 'System'
    },
    {
        id: 2,
        name: 'Kafe',
        provide: 'System'
    },
    {
        id: 3,
        name: 'Stand',
        provide: 'System'
    },
];
// export const goodsPackagings: GoodsPackagingDto[] = [
//     {
//         id: 1,
//         name: 'Pcs'
//     },
//     {
//         id: 2,
//         name: 'Pack'
//     },
//     {
//         id: 3,
//         name: 'Box'
//     },
//     {
//         id: 4,
//         name: 'Carton'
//     }
// ];

// export const goodsTypes_Root: GoodsTypeDto[] = [
//     {
//         id: 1,
//         name: 'Buku',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 12,
//                 name: 'Sastra',
//                 parentGoodsTypeId: 1,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 13,
//                 name: 'Pendidikan',
//                 parentGoodsTypeId: 1,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 14,
//                 name: 'Kamus',
//                 parentGoodsTypeId: 1,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 15,
//                 name: 'Persiapan Ujian',
//                 parentGoodsTypeId: 1,
//                 subGoodsTypes: []
//             }
//         ]
//     },
//     {
//         id: 2,
//         name: 'Makanan Dan Minuman',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 16,
//                 name: 'Makanan Ringan',
//                 parentGoodsTypeId: 2,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 17,
//                 name: 'Susu',
//                 parentGoodsTypeId: 2,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 18,
//                 name: 'Jamu',
//                 parentGoodsTypeId: 2,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 19,
//                 name: 'Air Mineral',
//                 parentGoodsTypeId: 2,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 63,
//                 name: 'Es Krim',
//                 parentGoodsTypeId: 2,
//                 subGoodsTypes: [
//                     {
//                         id: 64,
//                         name: 'Tes',
//                         parentGoodsTypeId: 63,
//                         subGoodsTypes: [
//                             {
//                                 id: 65,
//                                 name: 'Tes Child',
//                                 parentGoodsTypeId: 64,
//                                 subGoodsTypes: []
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         id: 3,
//         name: 'Dapur',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 20,
//                 name: 'Bahan Masak',
//                 parentGoodsTypeId: 3,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 21,
//                 name: 'Bumbu Dapur',
//                 parentGoodsTypeId: 3,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 22,
//                 name: 'Alat Masak',
//                 parentGoodsTypeId: 3,
//                 subGoodsTypes: []
//             }
//         ]
//     },
//     {
//         id: 4,
//         name: 'Kebutuhan Rumah Tangga',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 23,
//                 name: 'Jam',
//                 parentGoodsTypeId: 4,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 24,
//                 name: 'Furniture',
//                 parentGoodsTypeId: 4,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 25,
//                 name: 'Alat Kebersihan',
//                 parentGoodsTypeId: 4,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 26,
//                 name: 'Lainnya',
//                 parentGoodsTypeId: 4,
//                 subGoodsTypes: []
//             }
//         ]
//     },
//     {
//         id: 5,
//         name: 'Perawatan Tubuh dan Wajah',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 27,
//                 name: 'Kosmetik',
//                 parentGoodsTypeId: 5,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 28,
//                 name: 'Perawatan Kulit Wajah',
//                 parentGoodsTypeId: 5,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 29,
//                 name: 'Perawatan Kulit Tubuh',
//                 parentGoodsTypeId: 5,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 30,
//                 name: 'Parfum',
//                 parentGoodsTypeId: 5,
//                 subGoodsTypes: []
//             }
//         ]
//     },
//     {
//         id: 6,
//         name: 'Ibu dan Bayi',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 31,
//                 name: 'Makanan Dan Susu Ibu Hamil',
//                 parentGoodsTypeId: 6,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 32,
//                 name: 'Pakaian Hamil',
//                 parentGoodsTypeId: 6,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 33,
//                 name: 'Makanan Dan Susu Bayi',
//                 parentGoodsTypeId: 6,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 34,
//                 name: 'Pakaian Bayi',
//                 parentGoodsTypeId: 6,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 35,
//                 name: 'Popok Bayi',
//                 parentGoodsTypeId: 6,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 36,
//                 name: 'Perawatan Bayi',
//                 parentGoodsTypeId: 6,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 37,
//                 name: 'Perlengkapan Bayi',
//                 parentGoodsTypeId: 6,
//                 subGoodsTypes: []
//             }
//         ]
//     },
//     {
//         id: 7,
//         name: 'Pakaian Dan Aksesori',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 38,
//                 name: 'Pakaian Pria',
//                 parentGoodsTypeId: 7,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 39,
//                 name: 'Pakaian Wanita',
//                 parentGoodsTypeId: 7,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 40,
//                 name: 'Pakaian Anak Laki-Laki',
//                 parentGoodsTypeId: 7,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 41,
//                 name: 'Pakaian Anak Perempuan',
//                 parentGoodsTypeId: 7,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 42,
//                 name: 'Jam Tangan',
//                 parentGoodsTypeId: 7,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 43,
//                 name: 'Tas',
//                 parentGoodsTypeId: 7,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 44,
//                 name: 'Sepatu',
//                 parentGoodsTypeId: 7,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 45,
//                 name: 'Sandal',
//                 parentGoodsTypeId: 7,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 46,
//                 name: 'Kaos Kaki',
//                 parentGoodsTypeId: 7,
//                 subGoodsTypes: []
//             }
//         ]
//     },
//     {
//         id: 8,
//         name: 'Alat Tulis Dan Kantor',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 47,
//                 name: 'Alat Tulis',
//                 parentGoodsTypeId: 8,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 48,
//                 name: 'Buku Tulis',
//                 parentGoodsTypeId: 8,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 49,
//                 name: 'Penggaris',
//                 parentGoodsTypeId: 8,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 50,
//                 name: 'Kertas',
//                 parentGoodsTypeId: 8,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 51,
//                 name: 'Map',
//                 parentGoodsTypeId: 8,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 52,
//                 name: 'Rak',
//                 parentGoodsTypeId: 8,
//                 subGoodsTypes: []
//             }
//         ]
//     },
//     {
//         id: 9,
//         name: 'Elektronik',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 53,
//                 name: 'Kelistrikan',
//                 parentGoodsTypeId: 9,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 54,
//                 name: 'Barang Elektronik',
//                 parentGoodsTypeId: 9,
//                 subGoodsTypes: []
//             }
//         ]
//     },
//     {
//         id: 10,
//         name: 'Cocok Tanam',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 55,
//                 name: 'Pot',
//                 parentGoodsTypeId: 10,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 56,
//                 name: 'Alat Tanam',
//                 parentGoodsTypeId: 10,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 57,
//                 name: 'Pupuk',
//                 parentGoodsTypeId: 10,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 58,
//                 name: 'Tanah',
//                 parentGoodsTypeId: 10,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 59,
//                 name: 'Sekam',
//                 parentGoodsTypeId: 10,
//                 subGoodsTypes: []
//             }
//         ]
//     },
//     {
//         id: 11,
//         name: 'Rokok',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 60,
//                 name: 'Filter',
//                 parentGoodsTypeId: 11,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 61,
//                 name: 'Kretek',
//                 parentGoodsTypeId: 11,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 62,
//                 name: 'Cerutu',
//                 parentGoodsTypeId: 11,
//                 subGoodsTypes: []
//             }
//         ]
//     }
// ];

// export const goodsTypes_Tree: GoodsTypeDto[] = [
//     {
//         id: 1,
//         name: 'Buku',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 12,
//                 name: 'Sastra',
//                 parentGoodsTypeId: 1,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 13,
//                 name: 'Pendidikan',
//                 parentGoodsTypeId: 1,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 14,
//                 name: 'Kamus',
//                 parentGoodsTypeId: 1,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 15,
//                 name: 'Persiapan Ujian',
//                 parentGoodsTypeId: 1,
//                 subGoodsTypes: []
//             }
//         ]
//     },
//     {
//         id: 2,
//         name: 'Makanan Dan Minuman',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 16,
//                 name: 'Makanan Ringan',
//                 parentGoodsTypeId: 2,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 17,
//                 name: 'Susu',
//                 parentGoodsTypeId: 2,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 18,
//                 name: 'Jamu',
//                 parentGoodsTypeId: 2,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 19,
//                 name: 'Air Mineral',
//                 parentGoodsTypeId: 2,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 63,
//                 name: 'Es Krim',
//                 parentGoodsTypeId: 2,
//                 subGoodsTypes: [
//                     {
//                         id: 64,
//                         name: 'Tes',
//                         parentGoodsTypeId: 63,
//                         subGoodsTypes: [
//                             {
//                                 id: 65,
//                                 name: 'Tes Child',
//                                 parentGoodsTypeId: 64,
//                                 subGoodsTypes: []
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         id: 3,
//         name: 'Dapur',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 20,
//                 name: 'Bahan Masak',
//                 parentGoodsTypeId: 3,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 21,
//                 name: 'Bumbu Dapur',
//                 parentGoodsTypeId: 3,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 22,
//                 name: 'Alat Masak',
//                 parentGoodsTypeId: 3,
//                 subGoodsTypes: []
//             }
//         ]
//     },
//     {
//         id: 4,
//         name: 'Kebutuhan Rumah Tangga',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 23,
//                 name: 'Jam',
//                 parentGoodsTypeId: 4,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 24,
//                 name: 'Furniture',
//                 parentGoodsTypeId: 4,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 25,
//                 name: 'Alat Kebersihan',
//                 parentGoodsTypeId: 4,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 26,
//                 name: 'Lainnya',
//                 parentGoodsTypeId: 4,
//                 subGoodsTypes: []
//             }
//         ]
//     },
//     {
//         id: 5,
//         name: 'Perawatan Tubuh dan Wajah',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 27,
//                 name: 'Kosmetik',
//                 parentGoodsTypeId: 5,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 28,
//                 name: 'Perawatan Kulit Wajah',
//                 parentGoodsTypeId: 5,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 29,
//                 name: 'Perawatan Kulit Tubuh',
//                 parentGoodsTypeId: 5,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 30,
//                 name: 'Parfum',
//                 parentGoodsTypeId: 5,
//                 subGoodsTypes: []
//             }
//         ]
//     },
//     {
//         id: 6,
//         name: 'Ibu dan Bayi',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 31,
//                 name: 'Makanan Dan Susu Ibu Hamil',
//                 parentGoodsTypeId: 6,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 32,
//                 name: 'Pakaian Hamil',
//                 parentGoodsTypeId: 6,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 33,
//                 name: 'Makanan Dan Susu Bayi',
//                 parentGoodsTypeId: 6,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 34,
//                 name: 'Pakaian Bayi',
//                 parentGoodsTypeId: 6,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 35,
//                 name: 'Popok Bayi',
//                 parentGoodsTypeId: 6,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 36,
//                 name: 'Perawatan Bayi',
//                 parentGoodsTypeId: 6,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 37,
//                 name: 'Perlengkapan Bayi',
//                 parentGoodsTypeId: 6,
//                 subGoodsTypes: []
//             }
//         ]
//     },
//     {
//         id: 7,
//         name: 'Pakaian Dan Aksesori',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 38,
//                 name: 'Pakaian Pria',
//                 parentGoodsTypeId: 7,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 39,
//                 name: 'Pakaian Wanita',
//                 parentGoodsTypeId: 7,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 40,
//                 name: 'Pakaian Anak Laki-Laki',
//                 parentGoodsTypeId: 7,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 41,
//                 name: 'Pakaian Anak Perempuan',
//                 parentGoodsTypeId: 7,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 42,
//                 name: 'Jam Tangan',
//                 parentGoodsTypeId: 7,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 43,
//                 name: 'Tas',
//                 parentGoodsTypeId: 7,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 44,
//                 name: 'Sepatu',
//                 parentGoodsTypeId: 7,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 45,
//                 name: 'Sandal',
//                 parentGoodsTypeId: 7,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 46,
//                 name: 'Kaos Kaki',
//                 parentGoodsTypeId: 7,
//                 subGoodsTypes: []
//             }
//         ]
//     },
//     {
//         id: 8,
//         name: 'Alat Tulis Dan Kantor',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 47,
//                 name: 'Alat Tulis',
//                 parentGoodsTypeId: 8,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 48,
//                 name: 'Buku Tulis',
//                 parentGoodsTypeId: 8,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 49,
//                 name: 'Penggaris',
//                 parentGoodsTypeId: 8,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 50,
//                 name: 'Kertas',
//                 parentGoodsTypeId: 8,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 51,
//                 name: 'Map',
//                 parentGoodsTypeId: 8,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 52,
//                 name: 'Rak',
//                 parentGoodsTypeId: 8,
//                 subGoodsTypes: []
//             }
//         ]
//     },
//     {
//         id: 9,
//         name: 'Elektronik',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 53,
//                 name: 'Kelistrikan',
//                 parentGoodsTypeId: 9,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 54,
//                 name: 'Barang Elektronik',
//                 parentGoodsTypeId: 9,
//                 subGoodsTypes: []
//             }
//         ]
//     },
//     {
//         id: 10,
//         name: 'Cocok Tanam',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 55,
//                 name: 'Pot',
//                 parentGoodsTypeId: 10,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 56,
//                 name: 'Alat Tanam',
//                 parentGoodsTypeId: 10,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 57,
//                 name: 'Pupuk',
//                 parentGoodsTypeId: 10,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 58,
//                 name: 'Tanah',
//                 parentGoodsTypeId: 10,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 59,
//                 name: 'Sekam',
//                 parentGoodsTypeId: 10,
//                 subGoodsTypes: []
//             }
//         ]
//     },
//     {
//         id: 11,
//         name: 'Rokok',
//         parentGoodsTypeId: null,
//         subGoodsTypes: [
//             {
//                 id: 60,
//                 name: 'Filter',
//                 parentGoodsTypeId: 11,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 61,
//                 name: 'Kretek',
//                 parentGoodsTypeId: 11,
//                 subGoodsTypes: []
//             },
//             {
//                 id: 62,
//                 name: 'Cerutu',
//                 parentGoodsTypeId: 11,
//                 subGoodsTypes: []
//             }
//         ]
//     },
//     {
//         id: 12,
//         name: 'Sastra',
//         parentGoodsTypeId: 1,
//         subGoodsTypes: []
//     },
//     {
//         id: 13,
//         name: 'Pendidikan',
//         parentGoodsTypeId: 1,
//         subGoodsTypes: []
//     },
//     {
//         id: 14,
//         name: 'Kamus',
//         parentGoodsTypeId: 1,
//         subGoodsTypes: []
//     },
//     {
//         id: 15,
//         name: 'Persiapan Ujian',
//         parentGoodsTypeId: 1,
//         subGoodsTypes: []
//     },
//     {
//         id: 16,
//         name: 'Makanan Ringan',
//         parentGoodsTypeId: 2,
//         subGoodsTypes: []
//     },
//     {
//         id: 17,
//         name: 'Susu',
//         parentGoodsTypeId: 2,
//         subGoodsTypes: []
//     },
//     {
//         id: 18,
//         name: 'Jamu',
//         parentGoodsTypeId: 2,
//         subGoodsTypes: []
//     },
//     {
//         id: 19,
//         name: 'Air Mineral',
//         parentGoodsTypeId: 2,
//         subGoodsTypes: []
//     },
//     {
//         id: 20,
//         name: 'Bahan Masak',
//         parentGoodsTypeId: 3,
//         subGoodsTypes: []
//     },
//     {
//         id: 21,
//         name: 'Bumbu Dapur',
//         parentGoodsTypeId: 3,
//         subGoodsTypes: []
//     },
//     {
//         id: 22,
//         name: 'Alat Masak',
//         parentGoodsTypeId: 3,
//         subGoodsTypes: []
//     },
//     {
//         id: 23,
//         name: 'Jam',
//         parentGoodsTypeId: 4,
//         subGoodsTypes: []
//     },
//     {
//         id: 24,
//         name: 'Furniture',
//         parentGoodsTypeId: 4,
//         subGoodsTypes: []
//     },
//     {
//         id: 25,
//         name: 'Alat Kebersihan',
//         parentGoodsTypeId: 4,
//         subGoodsTypes: []
//     },
//     {
//         id: 26,
//         name: 'Lainnya',
//         parentGoodsTypeId: 4,
//         subGoodsTypes: []
//     },
//     {
//         id: 27,
//         name: 'Kosmetik',
//         parentGoodsTypeId: 5,
//         subGoodsTypes: []
//     },
//     {
//         id: 28,
//         name: 'Perawatan Kulit Wajah',
//         parentGoodsTypeId: 5,
//         subGoodsTypes: []
//     },
//     {
//         id: 29,
//         name: 'Perawatan Kulit Tubuh',
//         parentGoodsTypeId: 5,
//         subGoodsTypes: []
//     },
//     {
//         id: 30,
//         name: 'Parfum',
//         parentGoodsTypeId: 5,
//         subGoodsTypes: []
//     },
//     {
//         id: 31,
//         name: 'Makanan Dan Susu Ibu Hamil',
//         parentGoodsTypeId: 6,
//         subGoodsTypes: []
//     },
//     {
//         id: 32,
//         name: 'Pakaian Hamil',
//         parentGoodsTypeId: 6,
//         subGoodsTypes: []
//     },
//     {
//         id: 33,
//         name: 'Makanan Dan Susu Bayi',
//         parentGoodsTypeId: 6,
//         subGoodsTypes: []
//     },
//     {
//         id: 34,
//         name: 'Pakaian Bayi',
//         parentGoodsTypeId: 6,
//         subGoodsTypes: []
//     },
//     {
//         id: 35,
//         name: 'Popok Bayi',
//         parentGoodsTypeId: 6,
//         subGoodsTypes: []
//     },
//     {
//         id: 36,
//         name: 'Perawatan Bayi',
//         parentGoodsTypeId: 6,
//         subGoodsTypes: []
//     },
//     {
//         id: 37,
//         name: 'Perlengkapan Bayi',
//         parentGoodsTypeId: 6,
//         subGoodsTypes: []
//     },
//     {
//         id: 38,
//         name: 'Pakaian Pria',
//         parentGoodsTypeId: 7,
//         subGoodsTypes: []
//     },
//     {
//         id: 39,
//         name: 'Pakaian Wanita',
//         parentGoodsTypeId: 7,
//         subGoodsTypes: []
//     },
//     {
//         id: 40,
//         name: 'Pakaian Anak Laki-Laki',
//         parentGoodsTypeId: 7,
//         subGoodsTypes: []
//     },
//     {
//         id: 41,
//         name: 'Pakaian Anak Perempuan',
//         parentGoodsTypeId: 7,
//         subGoodsTypes: []
//     },
//     {
//         id: 42,
//         name: 'Jam Tangan',
//         parentGoodsTypeId: 7,
//         subGoodsTypes: []
//     },
//     {
//         id: 43,
//         name: 'Tas',
//         parentGoodsTypeId: 7,
//         subGoodsTypes: []
//     },
//     {
//         id: 44,
//         name: 'Sepatu',
//         parentGoodsTypeId: 7,
//         subGoodsTypes: []
//     },
//     {
//         id: 45,
//         name: 'Sandal',
//         parentGoodsTypeId: 7,
//         subGoodsTypes: []
//     },
//     {
//         id: 46,
//         name: 'Kaos Kaki',
//         parentGoodsTypeId: 7,
//         subGoodsTypes: []
//     },
//     {
//         id: 47,
//         name: 'Alat Tulis',
//         parentGoodsTypeId: 8,
//         subGoodsTypes: []
//     },
//     {
//         id: 48,
//         name: 'Buku Tulis',
//         parentGoodsTypeId: 8,
//         subGoodsTypes: []
//     },
//     {
//         id: 49,
//         name: 'Penggaris',
//         parentGoodsTypeId: 8,
//         subGoodsTypes: []
//     },
//     {
//         id: 50,
//         name: 'Kertas',
//         parentGoodsTypeId: 8,
//         subGoodsTypes: []
//     },
//     {
//         id: 51,
//         name: 'Map',
//         parentGoodsTypeId: 8,
//         subGoodsTypes: []
//     },
//     {
//         id: 52,
//         name: 'Rak',
//         parentGoodsTypeId: 8,
//         subGoodsTypes: []
//     },
//     {
//         id: 53,
//         name: 'Kelistrikan',
//         parentGoodsTypeId: 9,
//         subGoodsTypes: []
//     },
//     {
//         id: 54,
//         name: 'Barang Elektronik',
//         parentGoodsTypeId: 9,
//         subGoodsTypes: []
//     },
//     {
//         id: 55,
//         name: 'Pot',
//         parentGoodsTypeId: 10,
//         subGoodsTypes: []
//     },
//     {
//         id: 56,
//         name: 'Alat Tanam',
//         parentGoodsTypeId: 10,
//         subGoodsTypes: []
//     },
//     {
//         id: 57,
//         name: 'Pupuk',
//         parentGoodsTypeId: 10,
//         subGoodsTypes: []
//     },
//     {
//         id: 58,
//         name: 'Tanah',
//         parentGoodsTypeId: 10,
//         subGoodsTypes: []
//     },
//     {
//         id: 59,
//         name: 'Sekam',
//         parentGoodsTypeId: 10,
//         subGoodsTypes: []
//     },
//     {
//         id: 60,
//         name: 'Filter',
//         parentGoodsTypeId: 11,
//         subGoodsTypes: []
//     },
//     {
//         id: 61,
//         name: 'Kretek',
//         parentGoodsTypeId: 11,
//         subGoodsTypes: []
//     },
//     {
//         id: 62,
//         name: 'Cerutu',
//         parentGoodsTypeId: 11,
//         subGoodsTypes: []
//     },
//     {
//         id: 63,
//         name: 'Es Krim',
//         parentGoodsTypeId: 2,
//         subGoodsTypes: [
//             {
//                 id: 64,
//                 name: 'Tes',
//                 parentGoodsTypeId: 63,
//                 subGoodsTypes: [
//                     {
//                         id: 65,
//                         name: 'Tes Child',
//                         parentGoodsTypeId: 64,
//                         subGoodsTypes: []
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         id: 64,
//         name: 'Tes',
//         parentGoodsTypeId: 63,
//         subGoodsTypes: [
//             {
//                 id: 65,
//                 name: 'Tes Child',
//                 parentGoodsTypeId: 64,
//                 subGoodsTypes: []
//             }
//         ]
//     },
//     {
//         id: 65,
//         name: 'Tes Child',
//         parentGoodsTypeId: 64,
//         subGoodsTypes: []
//     }
// ];

export const mybusinesslist: MyEnterpriseDto[] = [
    {
        address: 'Desa Wirobiting RT 1 RW 1. Kecamatan Prambon. Kabupaten Sidoarjo.',
        enterpriseType: 'Toko',
        owned: true,
        name: 'Toko Sugiono 1',
        photo: BUSINESS_DEFAULT,
        id: '1',
    },
    {
        address: 'Desa Wirobiting RT 1 RW 1. Kecamatan Prambon. Kabupaten Sidoarjo.',
        enterpriseType: 'Toko',
        owned: true,
        name: 'Toko Sugiono 2',
        photo: BUSINESS_DEFAULT,
        id: '2',
    },
    {
        address: 'Desa Wirobiting RT 1 RW 1. Kecamatan Prambon. Kabupaten Sidoarjo.',
        enterpriseType: 'Toko',
        owned: true,
        name: 'Toko Sugiono 3',
        photo: BUSINESS_DEFAULT,
        id: '3',
    },
    {
        address: 'Desa Wirobiting RT 1 RW 1. Kecamatan Prambon. Kabupaten Sidoarjo.',
        enterpriseType: 'Toko',
        owned: true,
        name: 'Toko Sugiono 4',
        photo: BUSINESS_DEFAULT,
        id: '4',
    },
    {
        address: 'Desa Wirobiting RT 1 RW 1. Kecamatan Prambon. Kabupaten Sidoarjo.',
        enterpriseType: 'Toko',
        owned: true,
        name: 'Toko Sugiono 5',
        photo: BUSINESS_DEFAULT,
        id: '5',
    },
];

// export const listproducts: MyGoodsesListItemDto[] = [
// {
//     id: 'jfjfa',
//     barcode: '95959531231',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '1 Recheese Nabati Wafer Rasa Keju',
//     enterpriseId: '1'
// },
// {
//     id: 'jfjfa',
//     barcode: '12319591231',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 6 Pack, 3 Renceng, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '2 Recheese Nabati Wafer Rasa Chocolate',
//     enterpriseId: '1'
// },
// {
//     id: 'kgka',
//     barcode: '17371231',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '3 Recheese Nabati Wafer Rasa Keju',
//     enterpriseId: '1'
// },
// {
//     id: 'lyhna',
//     barcode: '12317377961',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 6 Pack, 3 Renceng, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '4 Recheese Nabati Wafer Rasa Chocolate',
//     enterpriseId: '1'
// },
// {
//     id: 'pipa',
//     barcode: '184548931231',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '5 Recheese Nabati Wafer Rasa Keju',
//     enterpriseId: '1'
// },
// {
//     id: 'kuga',
//     barcode: '1239474741',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 6 Pack, 3 Renceng, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '6 Recheese Nabati Wafer Rasa Chocolate',
//     enterpriseId: '1'
// },
// {
//     id: 'ukga',
//     barcode: '128463231',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '7 Recheese Nabati Wafer Rasa Keju',
//     enterpriseId: '1'
// },
// {
//     id: 'kiua',
//     barcode: '123738456231',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 6 Pack, 3 Renceng, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '8 Recheese Nabati Wafer Rasa Chocolate',
//     enterpriseId: '1'
// },
// {
//     id: 'rrra',
//     barcode: '12374741',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '9 Recheese Nabati Wafer Rasa Keju',
//     enterpriseId: '1'
// },
// {
//     id: 'jga',
//     barcode: '12312626731',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 6 Pack, 3 Renceng, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '10 Recheese Nabati Wafer Rasa Chocolate',
//     enterpriseId: '1'
// },
// {
//     id: 'wra',
//     barcode: '1237346351',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '11 Recheese Nabati Wafer Rasa Keju',
//     enterpriseId: '1'
// },
// {
//     id: 'rwra',
//     barcode: '1273771231',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 6 Pack, 3 Renceng, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '12 Recheese Nabati Wafer Rasa Chocolate',
//     enterpriseId: '1'
// },
// {
//     id: 'tda',
//     barcode: '12312313631',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '13 Recheese Nabati Wafer Rasa Keju',
//     enterpriseId: '1'
// },
// {
//     id: 'awew',
//     barcode: '12373731231',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 6 Pack, 3 Renceng, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '14 Recheese Nabati Wafer Rasa Chocolate',
//     enterpriseId: '1'
// },
// {
//     id: 'aer',
//     barcode: '1273800231',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '15 Recheese Nabati Wafer Rasa Keju',
//     enterpriseId: '1'
// },
// {
//     id: 'aes',
//     barcode: '12300031',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 6 Pack, 3 Renceng, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '16 Recheese Nabati Wafer Rasa Chocolate',
//     enterpriseId: '1'
// },
// {
//     id: 'add',
//     barcode: '123363031',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '17 Recheese Nabati Wafer Rasa Keju',
//     enterpriseId: '1'
// },
// {
//     id: 'avb',
//     barcode: '1230075731',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 6 Pack, 3 Renceng, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '18 Recheese Nabati Wafer Rasa Chocolate',
//     enterpriseId: '1'
// },
// {
//     id: 'kgkg',
//     barcode: '123363031',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '19 Recheese Nabati Wafer Rasa Keju',
//     enterpriseId: '1'
// },
// {
//     id: 'avkgkgb',
//     barcode: '163880075731',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 6 Pack, 3 Renceng, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '20 Recheese Nabati Wafer Rasa Chocolate',
//     enterpriseId: '1'
// },
// {
//     id: 'adqwhkd',
//     barcode: '12336306031',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '21 Recheese Nabati Wafer Rasa Keju',
//     enterpriseId: '1'
// },
// {
//     id: 'avghhb',
//     barcode: '1230578075731',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 6 Pack, 3 Renceng, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '22 Recheese Nabati Wafer Rasa Chocolate',
//     enterpriseId: '1'
// },
// {
//     id: 'addu55',
//     barcode: '123363000531',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '23 Recheese Nabati Wafer Rasa Keju',
//     enterpriseId: '1'
// },
// {
//     id: 'jktktavb',
//     barcode: '12300734535731',
//     price: 3000,
//     stock: '2 Carton, 4 Box, 6 Pack, 3 Renceng, 5 Pcs. Total : 60 Pcs',
//     goodsPackaging: 'Pcs',
//     name: '24 Recheese Nabati Wafer Rasa Chocolate',
//     enterpriseId: '1'
// }
// ];


export const cashierProductSearch: MyGoodsForCashierDto[] = [
    {
        id: '1',
        barcode: 'abcd',
        price: 3000,
        wholesalerMin: 0,
        enterpriseId: '1',
        name: 'Recheese nabati keju 25gr',
        promos: [],
        wholesalerPrice: 2700,
        goodsPackaging: 'Pcs',
        isWholesalerPriceAuto: false
    },
    {
        id: '2',
        barcode: 'bcde',
        wholesalerMin: 0,
        price: 3000,
        enterpriseId: '1',
        name: 'Recheese nabati coklat 25gr',
        promos: [],
        wholesalerPrice: 2700,
        goodsPackaging: 'Pcs',
        isWholesalerPriceAuto: false
    },
    {
        id: '3',
        barcode: 'cdef',
        wholesalerMin: 0,
        price: 25000,
        enterpriseId: '1',
        name: 'Recheese nabati keju 25gr box',
        promos: [],
        wholesalerPrice: 22000,
        goodsPackaging: 'Box',
        isWholesalerPriceAuto: false
    },
    {
        id: '4',
        barcode: 'defg',
        wholesalerMin: 0,
        price: 25500,
        enterpriseId: '1',
        name: 'Recheese nabati coklat 25gr box',
        promos: [],
        wholesalerPrice: 23000,
        goodsPackaging: 'Box',
        isWholesalerPriceAuto: false
    },
    {
        id: '5',
        barcode: 'efgh',
        price: 10000,
        wholesalerMin: 3,
        enterpriseId: '1',
        name: 'Recheese nabati keju 100gr',
        promos: [],
        wholesalerPrice: 9500,
        goodsPackaging: 'Pcs',
        isWholesalerPriceAuto: false
    },
    {
        id: '6',
        barcode: 'fghi',
        price: 10000,
        enterpriseId: '1',
        name: 'Recheese nabati coklat 100gr',
        promos: [],
        wholesalerMin: 2,
        wholesalerPrice: 9500,
        goodsPackaging: 'Pcs',
        isWholesalerPriceAuto: true
    },

];
