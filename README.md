# Hi, No#tation !

마치 노션처럼 글을 쓰면

- 📃 **자동으로 저장되고,**
- ✂ **편집할 수 있는 기능을 포함한**

어ㅡ썸한 편집 툴입니다!

---

## 구현된 기능

1. 포스트 불러오기 기능
2. 포스트 글쓰기 기능
3. 라우트에 따라 이동하는 기능

---

## My Code Rules...

1. `_[function name]`: 기존 내장 (혹은 라이브러리) 메서드와 헷갈릴 여지가 있다면, 이를 방지하기 위해 사용한 custom rule입니다!

---

## How to run

### Development Environment

**현재는 개발 환경만 구현**하였습니다.  
다음 명령어를 터미널에 입력해주세요.

```
npm run dev:client
```

이후, `http://localhost:8080/` 에서 결과를 확인하면 됩니다 :)

---

## 🚑 Errors...

- ~~빌드 시 404 status 현상 발생~~

  > **🎉 해결!**  
  > `build` 시 `html`에 `script`가 추가되었기에 발생.  
  > 어차피 설정한 `entry`에서 `script`를 잘 뽑아서 가져 오므로, 이를 `index.html`에서 지우니 없어짐!  
  > **다만 좋은 방법인지는 모르니, 일단 나중에 고민해보겠습니다!**

- ~~이동 시 404 status 현상 발생~~
  > **🎉 해결!**  
  > `historyAPI`로 동작할 시, `index.html`이 제대로 자바스크립트 문서를 갖고 오지 않음.
  > `hisotryAPIfallback`이라는 `webpack-dev-server option`을 조정함으로써 해결
