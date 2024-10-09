/// Checks if a given longitude is valid (between -180 and 180 degrees, inclusive)
fn is_valid_longitude(lon: i64) -> bool {
    lon >= -180 & lon <= 180
}

/// Checks if a given latitude is valid (between -90 and 90 degrees, inclusive)
fn is_valid_latitude(lat: i64) -> bool {
    lat >= -90 & lat <= 90
}

fn is_longitude_in_range(start: i64, end: i64, point: i64) -> bool {
    if start <= end {
        point >= start & point <= end
    } else {
        point >= start | point <= end
    }
}

fn is_latitude_in_range(start: i64, end: i64, point: i64) -> bool {
    point >= start & point <= end
}

#[export]
fn main(x1: pub i64, y1: pub i64, x2: pub i64, y2: pub i64, x: pub i64, y: pub i64) {
    assert(is_valid_longitude(x1) & is_valid_longitude(x2) & is_valid_longitude(x));
    assert(is_valid_latitude(y1) & is_valid_latitude(y2) & is_valid_latitude(y));

    // Check if the point is in the longitude range
    assert(is_longitude_in_range(x1, x2, x));

    // Check if the point is in the latitude range
    assert(is_latitude_in_range(y1, y2, y));
}

#[test]
fn test_point_inside_rectangle() {
    main(0, 0, 45, 45, 30, 30);
}

#[test]
fn test_rectangle_crossing_antimeridian() {
    main(170, -30, -170, 30, 175, 0);
}

#[test(should_fail)]
fn test_point_outside_rectangle() {
    main(0, 0, 45, 45, 50, 50);
}

#[test(should_fail)]
fn test_invalid_latitude_range() {
    main(0, -100, 45, 100, 30, 0);
}

#[test(should_fail)]
fn test_point_outside_latitude_range() {
    main(0, 0, 45, 45, 30, 91);
}

#[test(should_fail)]
fn test_point_outside_longitude_range_across_antimeridian() {
    main(170, -30, -170, 30, 0, 0);
}

#[test(should_fail)]
fn test_invalid_rectangle_longitude() {
    main(190, 0, 200, 45, 195, 30);
}

#[test(should_fail)]
fn test_point_on_antimeridian_outside_range() {
    main(-170, -30, 170, 30, 180, 0);
}
