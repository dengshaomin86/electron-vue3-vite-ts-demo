; build/nsis-include.nsh
!macro customFiles
  !system 'echo [DEBUG] 正在生成增量包...' = 0
  File /r "dist_electron\*.exe"  ; 显式包含旧版本文件
!macroend

!macro customDeltaCheck
  ${If} ${FileExists} "$EXEPATH"
    StrCpy $deltaExists "true"
    !system 'echo [DEBUG] 检测到旧版本文件，触发增量生成' = 0
  ${EndIf}
!macroend