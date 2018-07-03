/* 装备掉落测试 
lv1Set.addEquipID(1.1);
lv1Set.addEquipID(1.2);
lv1Set.addEquipID(1.3);

lv2Set.addEquipID(2.1);
lv2Set.addEquipID(2.2);
lv2Set.addEquipID(2.3);

lv3Set.addEquipID(3.1);
lv3Set.addEquipID(3.2);
lv3Set.addEquipID(3.3);

lv4Set.addEquipID(4.1);
lv4Set.addEquipID(4.2);
lv4Set.addEquipID(4.3);

lv5Set.addEquipID(5.1);
lv5Set.addEquipID(5.2);
lv5Set.addEquipID(5.3);

let m = new Monster();
m.makeDrop();
*/

/* 装备配置文件载入测试
let equipManager = new EquipmentManager();
equipManager.init();
*/

let equipManager = new EquipmentManager();
equipManager.init(() => {
    equipSetInit(equipManager);
    let m = new Monster();
    m.makeDrop();
});















