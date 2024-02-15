select
    `detenido`.`No_Remision` AS `No_Remision`,
    `remision`.`Fecha_Hora` AS `Fecha_Hora`,
    ifnull (
        if (
            `detenido`.`Nombre` = ''
            or `detenido`.`Nombre` = ' '
            or `detenido`.`Nombre` = 'sd',
            'S/D',
            ucase (`replace_special_chars` (`detenido`.`Nombre`))
        ),
        'S/D'
    ) AS `Nombre`,
    ifnull (
        if (
            `detenido`.`Ap_Paterno` = ''
            or `detenido`.`Ap_Paterno` = ' '
            or `detenido`.`Ap_Paterno` = 'sd',
            'S/D',
            ucase (`replace_special_chars` (`detenido`.`Ap_Paterno`))
        ),
        'S/D'
    ) AS `Ap_Paterno`,
    ifnull (
        if (
            `detenido`.`Ap_Materno` = ''
            or `detenido`.`Ap_Materno` = ' '
            or `detenido`.`Ap_Materno` = 'sd',
            'S/D',
            ucase (`replace_special_chars` (`detenido`.`Ap_Materno`))
        ),
        'S/D'
    ) AS `Ap_Materno`,
    ifnull (
        if (
            `detenido`.`Edad` = ''
            or `detenido`.`Edad` = ' '
            or `detenido`.`Edad` = 'sd',
            'S/D',
            ucase (`replace_special_chars` (`detenido`.`Edad`))
        ),
        'S/D'
    ) AS `Edad`,
    if (
        `detenido`.`Genero` = ''
        or `detenido`.`Genero` = ' ',
        'S/D',
        ucase (`detenido`.`Genero`)
    ) AS `Genero`,
    if (
        `detenido`.`Escolaridad` = ''
        or `detenido`.`Escolaridad` = 'NA',
        'S/D',
        ucase (`detenido`.`Escolaridad`)
    ) AS `Escolaridad`,
    `detenido`.`Fecha_Registro_Detenido` AS `Fecha_Registro_Detenido`,
    `detenido`.`Id_Domicilio` AS `Id_Domicilio`,
    if (
        `detenido`.`Lugar_Origen` = ''
        or `detenido`.`Lugar_Origen` = 'SD',
        'S/D',
        ucase (`detenido`.`Lugar_Origen`)
    ) AS `Lugar_Origen`,
    if (
        `detenido`.`Fecha_Nacimiento` = ''
        or `detenido`.`Fecha_Nacimiento` = 'NA',
        'S/D',
        `detenido`.`Fecha_Nacimiento`
    ) AS `Fecha_Nacimiento`,
    `remision`.`No_Ficha` AS `Ficha`,
    `remision`.`Falta_Delito_Tipo` AS `Falta_Delito_Tipo`,
    if (
        `remision`.`Status_Remision` = 1,
        'ACTIVA',
        'INACTIVA'
    ) AS `Status_Remision`,
    `remision`.`Folio_911` AS `Folio_911`,
    ucase (`remision`.`Averiguacion_Previa`) AS `Averiguacion_Previa`,
    ucase (`remision`.`Instancia`) AS `Instancia`,
    ifnull (
        if (
            `ubicacion`.`Tipo` = ''
            or `ubicacion`.`Tipo` = ' '
            or `ubicacion`.`Tipo` = 'sd',
            'S/D',
            ucase (`replace_special_chars` (`ubicacion`.`Tipo`))
        ),
        'S/D'
    ) AS `Tipo`,
    ifnull (
        if (
            `ubicacion`.`Colonia` = ''
            or `ubicacion`.`Colonia` = ' '
            or `ubicacion`.`Colonia` = 'sd',
            'S/D',
            ucase (`replace_special_chars` (`ubicacion`.`Colonia`))
        ),
        'S/D'
    ) AS `Colonia`,
    ifnull (
        if (
            `ubicacion`.`Calle_1` = ''
            or `ubicacion`.`Calle_1` = ' '
            or `ubicacion`.`Calle_1` = 'sd',
            'S/D',
            ucase (`replace_special_chars` (`ubicacion`.`Calle_1`))
        ),
        'S/D'
    ) AS `Calle_1`,
    ifnull (
        if (
            `ubicacion`.`No_Ext` = ''
            or `ubicacion`.`No_Ext` = ' '
            or `ubicacion`.`No_Ext` = 'sd',
            'S/D',
            ucase (`replace_special_chars` (`ubicacion`.`No_Ext`))
        ),
        'S/D'
    ) AS `No_Ext`,
    ifnull (
        if (
            `ubicacion`.`CP` = ''
            or `ubicacion`.`CP` = ' '
            or `ubicacion`.`CP` = 'sd',
            'S/D',
            ucase (`replace_special_chars` (`ubicacion`.`CP`))
        ),
        'S/D'
    ) AS `CP`,
    ifnull (
        if (
            `ubicacion`.`Municipio` = ''
            or `ubicacion`.`Municipio` = ' '
            or `ubicacion`.`Municipio` = 'sd',
            'S/D',
            ucase (`replace_special_chars` (`ubicacion`.`Municipio`))
        ),
        'S/D'
    ) AS `Municipio`,
    (
        select
            ifnull (
                ucase (
                    `replace_special_chars` (
                        group_concat (
                            `falta_delito_detenido_uh`.`Descripcion` separator ','
                        )
                    )
                ),
                'S/D'
            ) AS `Faltas_Delitos_Detenido`
        from
            `falta_delito_detenido_uh`
        where
            `falta_delito_detenido_uh`.`No_Remision` = `detenido`.`No_Remision`
    ) AS `Faltas_Delitos_Detenido`,
    if (
        `alias_detenido`.`Nombre` = ''
        or `alias_detenido`.`Nombre` = ' ',
        'S/D',
        ucase (
            `replace_special_chars` (`alias_detenido`.`Nombre`)
        )
    ) AS `Alias_Detenido`,
    coalesce(
        ucase (
            `replace_special_chars` (`falta_delito_detenido_uh`.`Negocio_Afectado`)
        ),
        'S/D'
    ) AS `Negocio_Afectado`,
    if (
        `remision`.`Zona_Sector` = ''
        or `remision`.`Zona_Sector` = ' ',
        'S/D',
        `remision`.`Zona_Sector`
    ) AS `Zona`,
    if (
        `ubicacion_hechos_remision`.`Vector` = ''
        or `ubicacion_hechos_remision`.`Vector` = ' ',
        'S/D',
        `ubicacion_hechos_remision`.`Vector`
    ) AS `Vector`,
    `ubicacion`.`Coordenada_X` AS `Coordenada_X`,
    `ubicacion`.`Coordenada_Y` AS `Coordenada_Y`
from
    (
        (
            (
                (
                    (
                        `detenido`
                        left join `remision` on (
                            `remision`.`No_Remision` = `detenido`.`No_Remision`
                        )
                    )
                    left join `ubicacion_hechos_remision` on (
                        `ubicacion_hechos_remision`.`No_Ficha` = `remision`.`No_Ficha`
                    )
                )
                left join `ubicacion` on (
                    `ubicacion`.`Id_Ubicacion` = `ubicacion_hechos_remision`.`Id_Ubicacion`
                )
            )
            left join `alias_detenido` on (
                `alias_detenido`.`No_Remision` = `detenido`.`No_Remision`
            )
        )
        left join `falta_delito_detenido_uh` on (
            `falta_delito_detenido_uh`.`No_Remision` = `detenido`.`No_Remision`
        )
    )
group by
    `detenido`.`No_Remision`