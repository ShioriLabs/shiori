import test from 'ava'

import anilistQueries from '../../util/anilistQueries'

test('gets staff data correctly', async t => {
  const staff = await anilistQueries.getStaff('kana hanazawa')
  t.truthy(staff, 'staff exists')
  if (staff) {
    t.is(staff.name.full, 'Kana Hanazawa', 'has correct full name')
    t.is(staff.name.native, '花澤香菜', 'has correct native name')
    t.true(staff.age > 0)
    t.true(staff.characters.edges.length > 0)
  } else {
    t.fail()
  }
})

test('gets anime data correctly', async t => {
  const anime = await anilistQueries.getAnime('your lie in april')
  t.truthy(anime, 'anime exists')
  if (anime) {
    t.is(anime.title.english, 'Your Lie in April', 'has correct english title')
    t.is(anime.title.romaji, 'Shigatsu wa Kimi no Uso', 'has correct romaji title')
  } else {
    t.fail()
  }
})
