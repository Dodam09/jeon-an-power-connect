import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  age: string;
  phone: string;
  position: string;
  experience: string;
  selfIntro: string;
  idCard: File | null;
  safetyCard: File | null;
  agreePrivacy: boolean;
}

const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [idCardPreview, setIdCardPreview] = useState<string | null>(null);
  const [safetyCardPreview, setSafetyCardPreview] = useState<string | null>(
    null
  );

  useEffect(() => {
    fetch("https://jeon-an-power-connect-1.onrender.com/api/ping").catch(
      () => {}
    );
  }, []);

  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    age: "",
    phone: "",
    position: "",
    experience: "",
    selfIntro: "",
    idCard: null,
    safetyCard: null,
    agreePrivacy: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (
      !formData.name ||
      !formData.age ||
      !formData.phone ||
      !formData.position ||
      !formData.experience ||
      !formData.idCard ||
      !formData.safetyCard ||
      !formData.agreePrivacy
    ) {
      toast({
        title: "필수 항목을 모두 입력해주세요",
        description: "모든 필수 항목과 첨부파일을 확인해주세요.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("age", formData.age);
      data.append("phone", formData.phone);
      data.append("position", formData.position);
      data.append("experience", formData.experience);
      data.append("selfIntro", formData.selfIntro);
      data.append("agreePrivacy", String(formData.agreePrivacy));
      data.append("idCard", formData.idCard as Blob);
      data.append("safetyCard", formData.safetyCard as Blob);

      const res = await fetch(
        "https://jeon-an-power-connect-1.onrender.com/api/register",
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) throw new Error("서버 오류");

      toast({
        title: "등록이 완료되었습니다!",
        description: "담당자가 확인 후 연락드리겠습니다.",
      });

      setFormData({
        name: "",
        age: "",
        phone: "",
        position: "",
        experience: "",
        selfIntro: "",
        idCard: null,
        safetyCard: null,
        agreePrivacy: false,
      });

      setIdCardPreview(null);
      setSafetyCardPreview(null);
    } catch (err) {
      console.error(err);
      toast({
        title: "서버 오류",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange =
    (field: "idCard" | "safetyCard") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setFormData((prev) => ({ ...prev, [field]: file }));

      if (file && file.type.startsWith("image/")) {
        const previewUrl = URL.createObjectURL(file);
        if (field === "idCard") setIdCardPreview(previewUrl);
        if (field === "safetyCard") setSafetyCardPreview(previewUrl);
      } else {
        if (field === "idCard") setIdCardPreview(null);
        if (field === "safetyCard") setSafetyCardPreview(null);
      }
    };

  const experienceOptions = Array.from({ length: 41 }, (_, i) =>
    i === 0 ? "신입" : `${i}년`
  );

  return (
    <section id="registration-form" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            인력 등록하기
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-[300px] mx-auto">
            아래 정보를 입력하시면 <br />
            적합한 일자리를 연결해드립니다
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-gray-900">
              등록 신청서
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">이름 *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="홍길동"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">나이 *</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, age: e.target.value }))
                    }
                    placeholder="35"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="selfIntro">자기소개</Label>
                <textarea
                  id="selfIntro"
                  rows={4}
                  className="w-full p-3 border rounded-md resize-none"
                  value={formData.selfIntro}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      selfIntro: e.target.value,
                    }))
                  }
                  placeholder="거주 지역과 주요 기술을 간단히 입력해주세요. 예: 인천 주안 / 스틸, 트레이, 신축, 인테리어 등"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">전화번호 *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  placeholder="010-1234-5678"
                />
              </div>

              <div className="space-y-4">
                <Label>전공/조공 선택 *</Label>
                <RadioGroup
                  value={formData.position}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, position: value }))
                  }
                  className="flex space-x-8"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="전공" id="major" />
                    <Label htmlFor="major">전공</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="조공" id="assistant" />
                    <Label htmlFor="assistant">조공</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>경력 *</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, experience: value }))
                  }
                >
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="경력을 선택해주세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["idCard", "safetyCard"].map((field) => {
                  const isId = field === "idCard";
                  const preview = isId ? idCardPreview : safetyCardPreview;
                  const label = isId
                    ? "신분증 첨부 *"
                    : "산업기초안전교육 이수증 *";
                  const icon = <FileText className="mx-auto h-8 w-8 mb-2" />;

                  return (
                    <div key={field} className="space-y-2">
                      <Label>{label}</Label>
                      <label
                        htmlFor={field}
                        className="block border-2 border-dashed p-6 text-center cursor-pointer"
                      >
                        {icon}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange(
                            field as "idCard" | "safetyCard"
                          )}
                          className="hidden"
                          id={field}
                        />
                        {formData[field as keyof FormData] instanceof File
                          ? (formData[field as keyof FormData] as File).name
                          : "파일 선택 또는 드래그"}
                        {preview && (
                          <img
                            src={preview}
                            alt="미리보기"
                            className="mt-4 w-full max-w-xs h-48 object-contain mx-auto"
                          />
                        )}
                      </label>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                <Checkbox
                  id="privacy"
                  checked={formData.agreePrivacy}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      agreePrivacy: checked as boolean,
                    }))
                  }
                />
                <div className="flex-1">
                  <Label htmlFor="privacy">
                    <Shield className="inline h-4 w-4 mr-1 text-blue-600" />
                    개인정보 수집 및 이용에 동의합니다. *
                  </Label>
                  <p className="text-xs text-gray-600 mt-1">
                    입력하신 정보는 채용 목적 외 사용되지 않습니다.
                  </p>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
              >
                {isSubmitting ? "등록 중..." : "등록하기"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default RegistrationForm;
