fn main(x1: pub Field, y1: pub Field, x2: pub Field, y2: pub Field, x: Field, y: Field) {
    let ix1 = x1 as i64;
    let iy1 = y1 as i64;
    let ix2 = x2 as i64;
    let iy2 = y2 as i64;
    let ix = x as i64;
    let iy = y as i64;

    // Assert that y1 <= y2 to ensure a valid rectangle vertically
    assert(iy1 <= iy2);

    // Check if the rectangle crosses the antimeridian
    let crosses_antimeridian = ix1 > ix2;

    // Assert that the private point (x, y) is within the rectangle
    if crosses_antimeridian {
        assert((ix >= ix1 & ix <= 360_000000) | (ix >= 0 & ix <= ix2));
    } else {
        assert(ix >= ix1 & ix <= ix2);
    }
    assert(iy >= iy1 & iy <= iy2);
}

#[test]
fn test_point_inside_rectangle() {
    main(100_000000, 50_000000, 200_000000, 100_000000, 150_000000, 75_000000);
}

#[test]
fn test_point_on_edge() {
    main(100_000000, 50_000000, 200_000000, 100_000000, 100_000000, 75_000000);
}

#[test(should_fail)]
fn test_point_outside_rectangle() {
    main(100_000000, 50_000000, 200_000000, 100_000000, 250_000000, 75_000000);
}

#[test]
fn test_rectangle_crosses_antimeridian() {
    main(355_000000, 50_000000, 12_000000, 100_000000, 359_000000, 75_000000);
}

#[test]
fn test_point_inside_rectangle_after_antimeridian() {
    main(355_000000, 50_000000, 12_000000, 100_000000, 5_000000, 75_000000);
}

#[test(should_fail)]
fn test_point_outside_rectangle_with_antimeridian() {
    main(355_000000, 50_000000, 12_000000, 100_000000, 200_000000, 75_000000);
}
