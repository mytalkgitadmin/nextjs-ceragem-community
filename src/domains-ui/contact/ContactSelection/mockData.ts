export const mockEmployeeData = [
  {
    id: "colleagues",
    title: "본사",
    count: 5,
    contacts: [
      {
        id: "kim",
        name: "김제라",
        position: "본사",
        positionType: "director",
        description: "새터만 마셔",
      },
      {
        id: "park",
        name: "박제라",
        position: "본사",
        positionType: "director",
        description:
          "새터만 V9가 드디어 출시를 앞두다. 프로모션 진행 중이니 많이 참...",
      },
    ],
  },
  {
    id: "management",
    title: "경기도출장사업장",
    count: 2,
    contacts: [
      {
        id: "choi_manager",
        name: "최지선장",
        position: "지점장",
        positionType: "manager",
        description:
          "새터만 V9가 드디어 출시를 앞두다. 많은 홍보 부탁드립니다.",
      },
      {
        id: "kim_coach",
        name: "김코치",
        position: "코치",
        positionType: "coach",
      },
    ],
  },
  {
    id: "headquarters",
    title: "선남본고장",
    count: 1450,
    contacts: [
      {
        id: "choi_manager2",
        name: "최지선장",
        position: "지점장",
        positionType: "manager",
        description:
          "새터만 V9가 드디어 출시를 앞두다. 많은 홍보 부탁드립니다.",
      },
      {
        id: "kim_coach2",
        name: "김코치",
        position: "코치",
        positionType: "coach",
      },
    ],
  },
];

export const clientMockData = [
  {
    id: "enterprise_a",
    title: "삼성전자",
    count: 12,
    contacts: [
      {
        id: "samsung_ceo",
        name: "이재용",
        position: "부회장",
        positionType: "executive",
        description: "글로벌 반도체 사업 총괄",
      },
      {
        id: "samsung_cto",
        name: "김현석",
        position: "CTO",
        positionType: "executive",
        description: "기술 혁신 및 R&D 담당",
      },
      {
        id: "samsung_manager1",
        name: "박민수",
        position: "부장",
        positionType: "manager",
        description: "디바이스솔루션 사업부 담당",
      },
      {
        id: "samsung_manager2",
        name: "정유진",
        position: "차장",
        positionType: "manager",
        description: "모바일경험사업부 기획팀",
      },
    ],
  },
  {
    id: "enterprise_b",
    title: "네이버",
    count: 8,
    contacts: [
      {
        id: "naver_ceo",
        name: "최수연",
        position: "CEO",
        positionType: "executive",
        description: "네이버 최고경영자, AI 및 플랫폼 사업 총괄",
      },
      {
        id: "naver_cto",
        name: "송창현",
        position: "CTO",
        positionType: "executive",
        description: "기술 인프라 및 AI 기술 개발 담당",
      },
      {
        id: "naver_pm1",
        name: "김다영",
        position: "프로덕트매니저",
        positionType: "manager",
        description: "네이버 검색 서비스 기획 및 운영",
      },
      {
        id: "naver_dev1",
        name: "이준호",
        position: "시니어 개발자",
        positionType: "developer",
        description: "네이버 클라우드 플랫폼 백엔드 개발",
      },
    ],
  },
  {
    id: "startup_group",
    title: "스타트업",
    count: 25,
    contacts: [
      {
        id: "toss_ceo",
        name: "이승건",
        position: "대표",
        positionType: "executive",
        description: "토스 창립자, 핀테크 혁신 선도",
      },
      {
        id: "toss_cpo",
        name: "박지웅",
        position: "CPO",
        positionType: "executive",
        description: "프로덕트 전략 및 UX 총괄",
      },
      {
        id: "coupang_pm",
        name: "한지민",
        position: "PM",
        positionType: "manager",
        description: "쿠팡 로켓배송 서비스 기획",
      },
      {
        id: "kakao_dev",
        name: "조성민",
        position: "개발팀장",
        positionType: "manager",
        description: "카카오톡 메시징 플랫폼 개발 총괄",
      },
      {
        id: "baemin_designer",
        name: "윤서연",
        position: "UX 디자이너",
        positionType: "designer",
        description: "배달의민족 앱 사용자 경험 디자인",
      },
      {
        id: "lotte_manager",
        name: "신동욱",
        position: "마케팅 매니저",
        positionType: "manager",
        description: "롯데그룹 디지털 마케팅 전략 수립",
      },
    ],
  },
  {
    id: "government",
    title: "공공기관",
    count: 15,
    contacts: [
      {
        id: "nipa_director",
        name: "최재영",
        position: "본부장",
        positionType: "director",
        description: "정보통신산업진흥원 AI 사업 본부",
      },
      {
        id: "kisa_manager",
        name: "장민호",
        position: "팀장",
        positionType: "manager",
        description: "한국인터넷진흥원 보안정책팀",
      },
      {
        id: "keit_researcher",
        name: "오수빈",
        position: "선임연구원",
        positionType: "researcher",
        description: "한국산업기술평가관리원 ICT 기술 평가",
      },
      {
        id: "kdi_analyst",
        name: "임태현",
        position: "연구위원",
        positionType: "researcher",
        description: "한국개발연구원 디지털경제 연구",
      },
    ],
  },
  {
    id: "overseas",
    title: "해외법인",
    count: 6,
    contacts: [
      {
        id: "google_pm",
        name: "Sarah Johnson",
        position: "Product Manager",
        positionType: "manager",
        description: "Google Cloud Platform 제품 기획",
      },
      {
        id: "microsoft_engineer",
        name: "David Chen",
        position: "Senior Engineer",
        positionType: "developer",
        description: "Microsoft Azure AI 서비스 개발",
      },
      {
        id: "amazon_director",
        name: "Emily Rodriguez",
        position: "Director",
        positionType: "director",
        description: "Amazon Web Services 아시아 사업 총괄",
      },
      {
        id: "meta_designer",
        name: "Alex Kim",
        position: "Design Lead",
        positionType: "designer",
        description: "Meta Reality Labs UX 디자인 리드",
      },
    ],
  },
];
