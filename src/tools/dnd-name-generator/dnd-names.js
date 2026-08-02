/* D&D Name Generator — dnd-names.js */
(function () {
  'use strict';

  var DATA = {
    elf: {
      male: {
        first: ['Adran','Aelar','Arannis','Berrian','Carric','Enialis','Erdan','Erevan','Galinndan','Hadarai','Heian','Himo','Immeral','Ivellios','Laucian','Mindartis','Paelias','Peren','Quarion','Riardon','Rolen','Soveliss','Thamior','Tharivol','Theren','Varis'],
        last: ['Moonwhisper','Galanodel','Nightbreeze','Silverfrond','Starweave','Amblecrown','Brightmantle','Clearwater','Eveningfall','Goldpetal','Leafwalker','Moonshadow','Nightfall','Silverleaf','Starbrow']
      },
      female: {
        first: ['Adrie','Ahinar','Althaea','Anastrianna','Andraste','Antinua','Bethrynna','Birel','Caelynn','Drusilia','Enna','Felosial','Ielenia','Jelenneth','Keyleth','Leshanna','Lia','Maiathah','Meriele','Mialee','Naivara','Quelenna','Quillathe','Sariel','Shanairla','Shava','Silaqui','Theirastra','Thiala','Vadania','Valanthe','Xanaphia'],
        last: ['Moonwhisper','Galanodel','Nightbreeze','Silverfrond','Starweave','Brightmantle','Eveningfall','Goldpetal','Leafwalker','Moonshadow','Silverleaf','Starbrow']
      }
    },
    dwarf: {
      male: {
        first: ['Adrik','Alberich','Baern','Barendd','Brottor','Brunor','Dain','Darrak','Delg','Eberk','Einkil','Fargrim','Flint','Gardain','Harbek','Kildrak','Morgran','Orsik','Oskar','Rangrim','Rurik','Taklinn','Thoradin','Thorin','Tordek','Traubon','Travok','Ulfgar','Veit','Vondal'],
        last: ['Battlehammer','Boulderfoot','Cragback','Deepdelver','Eversharp','Fireforge','Frostbeard','Gorunn','Ironforge','Loderr','Lutgehr','Rumnaheim','Silveraxe','Silverstone','Steelstrike','Stonehelm','Strakeln','Ungart','Xardorok','Zarkun']
      },
      female: {
        first: ['Amber','Artin','Audhild','Bardryn','Dagnal','Diesa','Eldeth','Falkrunn','Finellen','Gunnloda','Gurdis','Helja','Hlin','Kathra','Kristryd','Ilde','Liftrasa','Mardred','Riswynn','Sannl','Torbera','Torgga','Vistra'],
        last: ['Battlehammer','Boulderfoot','Fireforge','Frostbeard','Ironforge','Silveraxe','Stonehelm','Steelstrike']
      }
    },
    human: {
      male: {
        first: ['Aldric','Bram','Caelum','Dorian','Edmund','Farris','Gareth','Hadrian','Ivan','Jorath','Kellan','Lucan','Meren','Navar','Oswin','Piran','Roland','Severin','Taren','Ulric','Vance','Weston','Xander','Yorick','Zane'],
        last: ['Ashford','Blackwater','Brightwood','Coldwater','Dunmore','Fairchild','Goldsmith','Hartley','Ironside','Longstride','Mercer','Norbrook','Oakley','Pember','Ravenswood','Southwick','Tanner','Underhill','Vale','Whitmore']
      },
      female: {
        first: ['Aelith','Brynn','Calla','Dwyn','Elara','Freyna','Gwyneira','Hessa','Isara','Jessa','Kira','Lyria','Mira','Nara','Ophelia','Petra','Rowena','Sera','Thea','Ula','Vesper','Wren','Xena','Yara','Zora'],
        last: ['Ashford','Blackwater','Brightwood','Dunmore','Fairchild','Goldsmith','Hartley','Mercer','Oakley','Ravenswood','Southwick','Whitmore']
      }
    },
    halfling: {
      male: {
        first: ['Alton','Ander','Cade','Corrin','Eldon','Errich','Finnan','Garret','Lindal','Lyle','Merric','Milo','Osborn','Perrin','Reed','Roscoe','Well'],
        last: ['Brushgather','Goodbarrel','Greenbottle','High-hill','Hilltopple','Leagallow','Tealeaf','Thorngage','Tosscobble','Underbough']
      },
      female: {
        first: ['Andry','Bree','Callie','Cora','Euphemia','Jillian','Kithri','Lavinia','Lidda','Merla','Nedda','Paela','Portia','Seraphina','Shaena','Trym','Vani','Verna','Wrennie'],
        last: ['Brushgather','Goodbarrel','Greenbottle','High-hill','Tealeaf','Thorngage','Tosscobble','Underbough']
      }
    },
    orc: {
      male: {
        first: ['Geth','Krusk','Mhurren','Ront','Shump','Thokk','Gnarl','Vrog','Urth','Barg','Hak','Muzgash','Rhorog','Skrag','Volg'],
        last: ['Gruumsh-Scar','Ironhide','Bone-Crusher','Blood-Drinker','Skull-Splitter','Stone-Fist','War-Bringer','Red-Eye','Black-Hand']
      },
      female: {
        first: ['Vola','Yevelda','Sina','Rada','Kansif','Emen','Sutha','Ovak','Ownka','Shautha'],
        last: ['Gruumsh-Scar','Ironhide','Bone-Crusher','Stone-Fist','War-Bringer','Red-Eye','Black-Hand']
      }
    },
    tiefling: {
      male: {
        first: ['Akmenos','Amnon','Barakas','Damakos','Ekemon','Iados','Kairon','Leucis','Melech','Mordai','Morthos','Pelaios','Skamos','Therai'],
        virtue: ['Ambition','Anguish','Carrion','Cruelty','Despair','Destruction','Dread','Entropy','Excellence','Fear','Glory','Hope','Ideal','Malice','Mayhem','Mischief','Nowhere','Pandemonium','Penance','Ruin','Strife','Torment','Treachery','Vice','Wanderer','Wrath','Zeal']
      },
      female: {
        first: ['Akta','Bryseis','Criella','Damaia','Ea','Kallista','Lerissa','Makaria','Nemeia','Orianna','Phelaia','Rieta'],
        virtue: ['Ambition','Anguish','Chance','Despair','Excellence','Fear','Glory','Hope','Ideal','Mayhem','Penance','Reverence','Ruin','Strife','Torment','Weal','Zeal']
      }
    },
    dragonborn: {
      male: {
        first: ['Arjhan','Balasar','Bharash','Donaar','Ghesh','Heskan','Kriv','Medrash','Mehen','Nadarr','Pandjed','Patrin','Rhogar','Shamash','Shedinn','Tarhun','Torinn'],
        last: ['Clethtinthiallor','Daardendrian','Delmirev','Drachedandion','Fenkenkabradon','Kepeshkmolik','Kerrhylon','Kimbatuul','Linxakasendalor','Myastan','Nemmonis','Norixius','Ophinshtalajiir','Prexijandilin','Shestendeliath','Turnuroth','Verthisathurgiesh','Yarjerit']
      },
      female: {
        first: ['Akra','Biri','Daar','Farideh','Harann','Havilar','Jheri','Kava','Korinn','Mishann','Nala','Perra','Raiann','Sora','Surina','Thava','Uadjit'],
        last: ['Clethtinthiallor','Daardendrian','Delmirev','Fenkenkabradon','Kepeshkmolik','Myastan','Norixius','Shestendeliath','Verthisathurgiesh','Yarjerit']
      }
    },
    gnome: {
      male: {
        first: ['Alston','Alvyn','Boddynock','Brocc','Burgell','Dimble','Ellywick','Erky','Fonkin','Frug','Gerbo','Gimble','Glim','Jebeddo','Kellen','Namfoodle','Orryn','Roondar','Seebo','Sindri','Warryn','Wrenn','Zook'],
        last: ['Beren','Bimpnottin','Donbledger','Fabblestabble','Fapplestamp','Fizzlebang','Gemfellow','Horcusporcus','Pingpong','Scheppen','Turen','Zipper']
      },
      female: {
        first: ['Bimpnottin','Breena','Caramip','Carlin','Donella','Duvamil','Ella','Ellyjobell','Ellywick','Fatina','Feral','Loopmottin','Lorilla','Mardnab','Nissa','Nyx','Oda','Orla','Roywyn','Shamil','Tana','Waywocket','Zanna'],
        last: ['Beren','Donbledger','Fabblestabble','Fizzlebang','Gemfellow','Scheppen','Turen','Zipper']
      }
    }
  };

  function rnd(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function generateName(race, gender) {
    var pool = DATA[race];
    if (!pool) return 'Unknown';
    var g = gender === 'any' ? (Math.random() < 0.5 ? 'male' : 'female') : gender;
    var gData = pool[g] || pool['male'];

    if (race === 'tiefling' && Math.random() < 0.4) {
      return rnd(gData.virtue || DATA.tiefling.male.virtue);
    }
    var first = rnd(gData.first);
    var last = rnd(gData.last || pool['male'].last || []);
    return last ? first + ' ' + last : first;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('btn-generate-dnd');
    var copyBtn = document.getElementById('btn-copy-dnd');

    if (btn) btn.addEventListener('click', generate);
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        var output = document.getElementById('dnd-output');
        if (!output) return;
        var names = Array.from(output.querySelectorAll('li')).map(function (li) { return li.textContent; }).join('\n');
        if (navigator.clipboard) {
          navigator.clipboard.writeText(names).then(function () {
            showMsg('Copied!');
          });
        }
      });
    }

    generate();
  });

  function showMsg(text) {
    var msg = document.querySelector('.tool-actions-msg');
    if (!msg) return;
    msg.textContent = text;
    setTimeout(function () { msg.textContent = ''; }, 2000);
  }

  function generate() {
    var race = document.getElementById('dnd-race').value;
    var gender = document.getElementById('dnd-gender').value;
    var count = parseInt(document.getElementById('dnd-count').value, 10);
    var output = document.getElementById('dnd-output');
    if (!output) return;

    var ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.padding = '0';
    ul.style.margin = '0';
    ul.style.display = 'grid';
    ul.style.gridTemplateColumns = 'repeat(auto-fill, minmax(200px, 1fr))';
    ul.style.gap = '0.5rem';

    for (var i = 0; i < count; i++) {
      var li = document.createElement('li');
      li.style.cssText = 'padding:0.6rem 0.9rem; background:var(--card-bg); border:1px solid var(--border); border-radius:6px; font-weight:600; cursor:pointer;';
      li.title = 'Click to copy';
      li.textContent = generateName(race, gender);
      (function (el) {
        el.addEventListener('click', function () {
          if (navigator.clipboard) navigator.clipboard.writeText(el.textContent).then(function () { showMsg('Copied!'); });
        });
      })(li);
      ul.appendChild(li);
    }

    output.innerHTML = '';
    output.appendChild(ul);
  }
})();
